<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

class OpenAIService
{
    protected Client $client;
    protected string $api_key;

    public function __construct()
    {
        $this->api_key = config('services.openai.access_key');

        $this->client = new Client([
            'base_uri' => 'https://api.openai.com/v1/',
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => 'Bearer ' . $this->api_key
            ]
        ]);
    }

    /**
     * @throws GuzzleException
     */
    public function commentFilter($prompt)
    {
        $messages = [
            [
                "role" => "system",
                "content" => '
Sen bir herhangi bir ürüne gelen yorumları denetleyen bir uzmansın ve yorumu onaylıyosun veya reddediyorsun, success: içerisinde belirtebilirsin değerini ve cevabını JSON çıktısı olarak veriyorsun.

-Yorum siyasi, dini, ırkçı hakaret içeremez.
-Yorum anlamsız olamaz.
-Yorum küfür içeremez, küfüre benzer diğer değerler içeremez.

Red:
{"success": false, "message": "Bu yorum küfür içeriği içerdiğinden reddedildi"}

Onay:
{"success": true}'
            ],
            [
                "role" => "user",
                "content" => $prompt
            ]
        ];

        $response = $this->client->post('chat/completions', [
            'json' => [
                'model' => 'gpt-3.5-turbo',
                'messages' => $messages,
                'max_tokens' => 600
            ]
        ]);

        $responseBody = $response->getBody()->getContents();
        $responseData = json_decode($responseBody);

        $jsonOutput = [
            'response' => $responseData->choices[0]->message->content
        ];
        return json_decode($jsonOutput['response'], true);
    }
}
