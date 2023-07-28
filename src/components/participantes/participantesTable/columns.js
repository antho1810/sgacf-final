import Badge from 'react-bootstrap/Badge'

import { Dropdown, IconButton } from 'rsuite'

import { HiDotsHorizontal, HiDocumentDownload } from "react-icons/hi";
import { BsEyeglasses } from "react-icons/bs"
import { AiOutlineLike } from "react-icons/ai"
import { FaShareAlt, FaRegEdit } from "react-icons/fa"
import { RiDeleteBinLine } from "react-icons/ri"

const renderIconButton = (props, ref) => {
  return (
    <IconButton {...props} ref={ref} icon={<HiDotsHorizontal/>} circle />
  )
}

export const COLUMNS = [
    { Header: 'nombre', accessor: 'nombre'},

    {
      Header: 'apellido',
      accessor: 'apellido'
    },
    {
      Header: 'cargo',
      accessor: 'cargo'
    },
    {
      Header: '',
      accessor: "_id", //localhost:4000/api/actas/id/_id
      Cell: ({ value }) => (
        <Dropdown renderToggle={renderIconButton} className="accion-drop">

          <Dropdown.Item className="i-editar" icon={<FaRegEdit/>} > <span>Editar</span> </Dropdown.Item>
          <Dropdown.Item className="i-borrar" icon={<RiDeleteBinLine/>} > <span> Borrar</span></Dropdown.Item>

        </Dropdown>
      ),
    }
  ];