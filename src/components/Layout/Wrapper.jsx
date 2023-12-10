import React from 'react'
import styled from 'styled-components'

const WRAPPER = styled.div`
    max-width:960px;
    margin:0 auto;
`

const Wrapper = (props) => {
    return (
        <WRAPPER className={props.className}>
            {props.children}
        </WRAPPER>
    )
}

export default Wrapper
