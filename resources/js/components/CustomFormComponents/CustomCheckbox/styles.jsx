import React from 'react'
import styled from 'styled-components'

export const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`

export const Icon = styled.svg`
  fill: none;
  stroke: #fff;
  stroke-width: 2px;
`
export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

export const StyledCheckbox = styled.div`
    border-radius: 5px;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    bottom: 1px;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    content: "";
    border: 1px solid black;

    ${HiddenCheckbox}:checked + & {
      background: #fc3404;
      border: 0px;
    }
  ${Icon} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')}
  }
`
