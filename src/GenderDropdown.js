import React from 'react'
import { Dropdown } from 'react-bootstrap'

export default function GenderDropdown {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Please select gender
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item>Women</Dropdown.Item>
                <Dropdown.Item>Men</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}