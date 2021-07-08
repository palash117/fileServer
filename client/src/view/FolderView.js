import React from 'react'
import FolderContainer from '../component/folderContainer/FolderContainer'
import MainContainer from '../component/maincontainer/MainContainer'
import {useParams} from 'react-router-dom'

function FolderView(){
    var {id} = useParams()
    return (
        <FolderContainer key={id}/>
    )
}

export default FolderView