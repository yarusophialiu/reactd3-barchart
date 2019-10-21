import React from 'react'
import { Dropdown } from 'react-bootstrap'

export default function GenderDropdown({ genderSelected }) {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Please select gender
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onSelect={() => genderSelected("women")}>Women</Dropdown.Item>
                <Dropdown.Item onSelect={() => genderSelected("men")}>Men</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}