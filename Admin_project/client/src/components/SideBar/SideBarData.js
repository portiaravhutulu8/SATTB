import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as VscIcons from 'react-icons/vsc';

export const SideBarData = [
    {
        title: 'Home',
        path: '/home',
        icon: <AiIcons.AiFillHome />,
    },
    {
        title: 'Tournaments',
        path: '/tournaments',
        icon: <RiIcons.RiPingPongFill/>,
    },
    {
        title: 'Rankings',
        path: '/rankings',
        icon: <VscIcons.VscGraphLine />,
    },
    {
        title: 'View Live Games',
        path: '/viewlivegames',
        icon: <AiIcons.AiFillPlayCircle />,
    },
    {
        title: 'Settings',
        path: '/settings',
        icon: <AiIcons.AiOutlineSetting />,
    }
]