import {
    Modal, ModalOverlay, ModalContent, ModalBody, ModalHeader, ModalCloseButton, ModalFooter,
} from "@chakra-ui/modal";
import ModalInput from "@/views/admin/users/components/modify/input";

const UserModal = ({handleModifyForm, isOpen, onClose, title = 'Modify', data = null}) => {

    return (<>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay className="bg-[#000] !opacity-30"/>
            <div className="mr-2">
                <ModalContent
                    className="!z-[1002] !m-auto !w-max min-w-[500px]  md:top-[15vh] p-5
                     bg-white dark:bg-black rounded-xl">
                    <div className="flex flex-row justify-between items-center mb-5">
                        <h1 className="text-xl dark:text-white font-semibold">{title}</h1>
                        <ModalCloseButton className={"text-red-500 dark:text-red-600"}/>
                    </div>
                    <ModalBody pb={6}>
                        {data && <ModalInput data={data} handleFormSubmit={handleModifyForm}/>}
                    </ModalBody>
                </ModalContent>
            </div>
        </Modal>
    </>)
};
export default UserModal;
