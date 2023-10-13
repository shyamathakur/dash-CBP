// ** React Imports
import { Fragment, useState, forwardRef } from 'react'

// ** Table Data & Columns
import { data } from './data'

import { Link } from 'react-router-dom'

import { Plus, User, Eye } from 'react-feather'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  Modal,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledButtonDropdown,
  Table,
  Badge, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap'

// ** Icons Imports
import { MoreVertical, Edit, Trash } from 'react-feather'
import "./HostFamily.css"


// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className='form-check'>
    <Input type='checkbox' ref={ref} {...props} />
  </div>
))

const DataTableWithButtons = () => {
  // ** States
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])

  const [modalOpened, setModalOpened] = useState(false)
  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    const status = {
      1: { title: 'Current', color: 'light-primary' },
      2: { title: 'Professional', color: 'light-success' },
      3: { title: 'Rejected', color: 'light-danger' },
      4: { title: 'Resigned', color: 'light-warning' },
      5: { title: 'Applied', color: 'light-info' }
    }

    if (value.length) {
      updatedData = data.filter(item => {
        const startsWith =
          item.full_name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.post.toLowerCase().startsWith(value.toLowerCase()) ||
          item.email.toLowerCase().startsWith(value.toLowerCase()) ||
          item.age.toLowerCase().startsWith(value.toLowerCase()) ||
          item.salary.toLowerCase().startsWith(value.toLowerCase()) ||
          item.start_date.toLowerCase().startsWith(value.toLowerCase()) ||
          status[item.status].title.toLowerCase().startsWith(value.toLowerCase())

        const includes =
          item.full_name.toLowerCase().includes(value.toLowerCase()) ||
          item.post.toLowerCase().includes(value.toLowerCase()) ||
          item.email.toLowerCase().includes(value.toLowerCase()) ||
          item.age.toLowerCase().includes(value.toLowerCase()) ||
          item.salary.toLowerCase().includes(value.toLowerCase()) ||
          item.start_date.toLowerCase().includes(value.toLowerCase()) ||
          status[item.status].title.toLowerCase().includes(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData(updatedData)
      setSearchValue(value)
    }
  }

  return (
    <Fragment>
      <Card>
        <CardHeader className=' border-bottom'>
          <div className=''>
            <UncontrolledButtonDropdown>
              <DropdownToggle color='secondary' caret outline>
                <span className='align-middle ms-50'>Select city</span>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem className='w-100'>
                  <span className='align-middle ms-50'>Print</span>
                </DropdownItem>
                <DropdownItem className='w-100' onClick={() => downloadCSV(data)}>
                  <span className='align-middle ms-50'>CSV</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <span className='align-middle ms-50'>Excel</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <span className='align-middle ms-50'>PDF</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <span className='align-middle ms-50'>Copy</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          </div>
          <div className='search-div-button'>
              <div >
                <Input
                  className='input-search'
                  placeholder='Search Name, Email etc'
                  type='text'
                  bsSize='sm'
                  id='search-input'
                  value={searchValue}
                  onChange={handleFilter}
                />
              </div>
            <Link to="/wizard">
              <Button className='' color='primary'>
                <Plus size={12} />
                <span className='align-middle ms-50'>New Family</span>
              </Button>
            </Link>
          </div>
        </CardHeader>
        <Table  responsive>
          <thead>
            <tr>
              <th><Input type='checkbox' /></th>
              <th>Host Family</th>
              <th>Mobile No.</th>
              <th>Land Line No.</th>
              <th>Email</th>
              <th>Preference</th>
              <th>Beds Available</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><Input type='checkbox' /></td>
              <td>
                <span className='align-middle fw-bold'>Tara Ok</span>
              </td>
              <td>Peter Charles</td>
              <td>9977758147</td>
              <td>Peter Charles</td>
              <td>
                female
              </td>
              <td>
                <Badge pill color='light-primary' className=''>
                  Active
                </Badge>
              </td>
              <td className='icon-table-td'>
                <Eye size={12} className='' onClick={() => setModalOpened(!modalOpened)} />
                <Edit size={12} className='' />
                <Trash size={12} className='' />
                <User size={12} />
              </td>
            </tr>
            <tr>
              <td><Input type='checkbox' /></td>
              <td>
                <span className='align-middle fw-bold'>Tara Ok</span>
              </td>
              <td>Peter Charles</td>
              <td>9977758147</td>
              <td>Peter Charles</td>
              <td>
                female
              </td>
              <td>
                <Badge pill color='light-primary' className=''>
                  Active
                </Badge>
              </td>
              <td className='icon-table-td'>
                <Eye size={12} className='' onClick={() => setModalOpened(!modalOpened)} />
                <Edit size={12} className='' />
                <Trash size={12} className='' />
                <User size={12} />
              </td>
            </tr>
            <tr>
              <td><Input type='checkbox' /></td>
              <td>
                <span className='align-middle fw-bold'>Tara Ok</span>
              </td>
              <td>Peter Charles</td>
              <td>9977758147</td>
              <td>Peter Charles</td>
              <td>
                female
              </td>
              <td>
                <Badge pill color='light-primary' className=''>
                  Active
                </Badge>
              </td>
              <td className='icon-table-td'>
                <Eye size={12} className='' onClick={() => setModalOpened(!modalOpened)} />
                <Edit size={12} className='' />
                <Trash size={12} className='' />
                <User size={12} />
              </td>
            </tr>
            <tr>
              <td><Input type='checkbox' /></td>
              <td>
                <span className='align-middle fw-bold'>Tara Ok</span>
              </td>
              <td>Peter Charles</td>
              <td>9977758147</td>
              <td>Peter Charles</td>
              <td>
                female
              </td>
              <td>
                <Badge pill color='light-primary' className=''>
                  Active
                </Badge>
              </td>
              <td className='icon-table-td'>
                <Eye size={12} className='' onClick={() => setModalOpened(!modalOpened)} />
                <Edit size={12} className='' />
                <Trash size={12} className='' />
                <User size={12} />
              </td>
            </tr>
            <tr>
              <td><Input type='checkbox' /></td>
              <td>
                <span className='align-middle fw-bold'>Tara Ok</span>
              </td>
              <td>Peter Charles</td>
              <td>9977758147</td>
              <td>Peter Charles</td>
              <td>
                female
              </td>
              <td>
                <Badge pill color='light-primary' className=''>
                  Active
                </Badge>
              </td>
              <td className='icon-table-td'>
                <Eye size={12} className='' onClick={() => setModalOpened(!modalOpened)} />
                <Edit size={12} className='' />
                <Trash size={12} className='' />
                <User size={12} />
              </td>
            </tr>
            <tr>
              <td><Input type='checkbox' /></td>
              <td>
                <span className='align-middle fw-bold'>Tara Ok</span>
              </td>
              <td>Peter Charles</td>
              <td>9977758147</td>
              <td>Peter Charles</td>
              <td>
                female
              </td>
              <td>
                <Badge pill color='light-primary' className=''>
                  Active
                </Badge>
              </td>
              <td className='icon-table-td'>
                <Eye size={12} className='' onClick={() => setModalOpened(!modalOpened)} />
                <Edit size={12} className='' />
                <Trash size={12} className='' />
                <User size={12} />
              </td>
            </tr>
            <tr>
              <td><Input type='checkbox' /></td>
              <td>
                <span className='align-middle fw-bold'>Tara Ok</span>
              </td>
              <td>Peter Charles</td>
              <td>9977758147</td>
              <td>Peter Charles</td>
              <td>
                female
              </td>
              <td>
                <Badge pill color='light-primary' className=''>
                  Active
                </Badge>
              </td>
              <td className='icon-table-td'>
                <Eye size={12} className='' onClick={() => setModalOpened(!modalOpened)} />
                <Edit size={12} className='' />
                <Trash size={12} className='' />
                <User size={12} />
              </td>
            </tr>
            <tr>
              <td><Input type='checkbox' /></td>
              <td>
                <span className='align-middle fw-bold'>Tara Ok</span>
              </td>
              <td>Peter Charles</td>
              <td>9977758147</td>
              <td>Peter Charles</td>
              <td>
                female
              </td>
              <td>
                <Badge pill color='light-primary' className=''>
                  Active
                </Badge>
              </td>
              <td className='icon-table-td'>
                <Eye size={12} className='' onClick={() => setModalOpened(!modalOpened)} />
                <Edit size={12} className='' />
                <Trash size={12} className='' />
                <User size={12} />
              </td>
            </tr>
            <tr>
              <td><Input type='checkbox' /></td>
              <td>
                <span className='align-middle fw-bold'>Tara Ok</span>
              </td>
              <td>Peter Charles</td>
              <td>9977758147</td>
              <td>Peter Charles</td>
              <td>
                female
              </td>
              <td>
                <Badge pill color='light-primary' className=''>
                  Active
                </Badge>
              </td>
              <td className='icon-table-td'>
                <Eye size={12} className='' onClick={() => setModalOpened(!modalOpened)} />
                <Edit size={12} className='' />
                <Trash size={12} className='' />
                <User size={12} />
              </td>
            </tr>
            <tr>
              <td><Input type='checkbox' /></td>
              <td>
                <span className='align-middle fw-bold'>Tara Ok</span>
              </td>
              <td>Peter Charles</td>
              <td>9977758147</td>
              <td>Peter Charles</td>
              <td>
                female
              </td>
              <td>
                <Badge pill color='light-primary' className=''>
                  Active
                </Badge>
              </td>
              <td className='icon-table-td'>
                <Eye size={12} className='' onClick={() => setModalOpened(!modalOpened)} />
                <Edit size={12} className='' />
                <Trash size={12} className='' />
                <User size={12} />
              </td>
            </tr>
            <tr>
              <td><Input type='checkbox' /></td>
              <td>
                <span className='align-middle fw-bold'>Tara Ok</span>
              </td>
              <td>Peter Charles</td>
              <td>9977758147</td>
              <td>Peter Charles</td>
              <td>
                female
              </td>
              <td>
                <Badge pill color='light-primary' className=''>
                  Active
                </Badge>
              </td>
              <td className='icon-table-td'>
                <Eye size={12} className='' onClick={() => setModalOpened(!modalOpened)} />
                <Edit size={12} className='' />
                <Trash size={12} className='' />
                <User size={12} />
              </td>
            </tr>
            <tr>
              <td><Input type='checkbox' /></td>
              <td>
                <span className='align-middle fw-bold'>Tara Ok</span>
              </td>
              <td>Peter Charles</td>
              <td>9977758147</td>
              <td>Peter Charles</td>
              <td>
                female
              </td>
              <td>
                <Badge pill color='light-primary' className=''>
                  Active
                </Badge>
              </td>
              <td className='icon-table-td'>
                <Eye size={12} className='' onClick={() => setModalOpened(!modalOpened)} />
                <Edit size={12} className='' />
                <Trash size={12} className='' />
                <User size={12} />
              </td>
            </tr>

          </tbody>
        </Table>
      </Card>
      <Modal
        isOpen={modalOpened}
        toggle={() => setModalOpened(!modalOpened)}
        className='modal-dialog-centered'
      >
        <ModalHeader toggle={() => setModalOpened(!modalOpened)}>Basic Modal</ModalHeader>
        <ModalBody>
          Donut chocolate halvah I love caramels. Dessert croissant I love icing I love dragée candy canes chocolate
          bar. Oat cake lollipop I love cake chocolate bar jelly sweet. I love cotton candy oat cake jelly.
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={() => setModalOpened(!modalOpened)}>
            Accept
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  )
}

export default DataTableWithButtons
