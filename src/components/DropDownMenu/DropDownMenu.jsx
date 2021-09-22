import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { v4 as uuidv4 } from 'uuid';

import CSS from './DropDownMenu.module.css';

/**
 * Renders a dropdown component to choose between different selections
 * @prop {list} menuItems The list of strings to be displayed in the Dropdown Menu
 * @prop {func} selectedOption The function to run when a user clicks a menu item
 * @prop {string} currentOption The option that is currently selected
 */
const DropDownMenu = (props) => {
    const { menuList, selectedOption, currentOption } = props;

    const [isActive, setIsActive] = useState(false);
    const menuToggle = () => setIsActive(!isActive);

    return (
        <div className={CSS.DropDown}>
            <button type='button' onClick={menuToggle} className={CSS.DropdownTrigger}>
                <span>{currentOption}</span>
            </button>
            <nav className={`${CSS.Menu} ${isActive ? CSS.Active : CSS.InActive}`}>
                <ul className={CSS.DropdownList}>
                    {menuList.map((option) => (
                        <li className={CSS.DropdownItem} key={uuidv4()}>
                            <button
                                type='button'
                                className={CSS.DropdownButton}
                                onClick={() => {
                                    selectedOption(option);
                                    setIsActive(false);
                                }}
                            >
                                {option}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

DropDownMenu.propTypes = {
    menuList: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedOption: PropTypes.func.isRequired,
    currentOption: PropTypes.string.isRequired,
};

export default DropDownMenu;
