// ** React Imports
import { Fragment, useState, forwardRef } from 'react'

// ** Table Data & Columns
import { data, columns } from './data'

import { Link } from 'react-router-dom'

// ** Add New Modal Component
import AddNewModal from './AddNewModal'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus, User, Eye } from 'react-feather'

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




import defaultAvatar from "@src/assets/images/portrait/small/avatar-s-11.jpg";

// ** Icons Imports
import { MoreVertical, Edit, Trash } from 'react-feather'

// ** Reactstrap Imports

const avatarGroupData1 = [
  {
    title: 'Melissa',
    img: defaultAvatar,
    imgHeight: 22,
    imgWidth: 22
  },
  {
    title: 'Jana',
    img: defaultAvatar,
    imgHeight: 22,
    imgWidth: 22
  },
  {
    title: 'Halla',
    img: defaultAvatar,
    imgHeight: 22,
    imgWidth: 22
  }
]

const avatarGroupData2 = [
  {
    title: 'Wing',
    img: defaultAvatar,
    imgHeight: 22,
    imgWidth: 22
  },
  {
    title: 'Octavia',
    img: defaultAvatar,
    imgHeight: 22,
    imgWidth: 22
  },
  {
    title: 'Benedict',
    img: defaultAvatar,
    imgHeight: 22,
    imgWidth: 22
  }
]

const avatarGroupData3 = [
  {
    title: 'Jade',
    img: defaultAvatar,
    imgHeight: 22,
    imgWidth: 22
  },
  {
    title: 'Alisa',
    img: defaultAvatar,
    imgHeight: 22,
    imgWidth: 22
  },
  {
    title: 'Alisa',
    img: defaultAvatar,
    imgHeight: 22,
    imgWidth: 22
  }
]

const avatarGroupData4 = [
  {
    title: 'Alexa',
    img: defaultAvatar,
    imgHeight: 22,
    imgWidth: 22
  },
  {
    title: 'Lee',
    img: defaultAvatar,
    imgHeight: 22,
    imgWidth: 22
  },
  {
    title: 'Shellie',
    img: defaultAvatar,
    imgHeight: 22,
    imgWidth: 22
  }
]


// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className='form-check'>
    <Input type='checkbox' ref={ref} {...props} />
  </div>
))

const DataTableWithButtons = () => {
  // ** States
  const [modal, setModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])

  // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal)
  const [modalOpened, setModalOpened] = useState(false)
  const [modalClosed, setModalClosed] = useState(false)
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

  // ** Function to handle Pagination
  const handlePagination = page => {
    setCurrentPage(page.selected)
  }

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=''
      nextLabel=''
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={searchValue.length ? Math.ceil(filteredData.length / 7) : Math.ceil(data.length / 7) || 1}
      breakLabel='...'
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName='active'
      pageClassName='page-item'
      breakClassName='page-item'
      nextLinkClassName='page-link'
      pageLinkClassName='page-link'
      breakLinkClassName='page-link'
      previousLinkClassName='page-link'
      nextClassName='page-item next-item'
      previousClassName='page-item prev-item'
      containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1'
    />
  )

  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result

    const columnDelimiter = ','
    const lineDelimiter = '\n'
    const keys = Object.keys(data[0])

    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    array.forEach(item => {
      let ctr = 0
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter

        result += item[key]

        ctr++
      })
      result += lineDelimiter
    })

    return result
  }

  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement('a')
    let csv = convertArrayOfObjectsToCSV(array)
    if (csv === null) return

    const filename = 'export.csv'

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
  }

  return (
    <Fragment>
      <Card>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <div className='d-flex mt-md-0 mt-1'>
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
          <Row className=''>
            <Col className='d-flex align-items-center justify-content-end mt-1' md='12' lg='12' sm='12'>
              <Label className='me-1' for='search-input'>
                Search
              </Label>
              <Input
                className='dataTable-filter mb-50'
                type='text'
                bsSize='sm'
                id='search-input'
                value={searchValue}
                onChange={handleFilter}
              />
            </Col>
          </Row>
          <Link to="/wizard">
            {/* <Button className='ms-2' color='primary' onClick={() => setModalOpened(!modalOpened)}>
              <Plus size={12} />
              <span className='align-middle ms-50'>New Family</span>
            </Button> */}
                <Button className='ms-2' color='primary'>
              <Plus size={12} />
              <span className='align-middle ms-50'>New Family</span>
            </Button>
          </Link>
        </CardHeader>
        <Table size='sm' responsive>
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
                <Badge pill color='light-primary' className='me-1'>
                  Active
                </Badge>
              </td>
              <td>
                <Eye size={12} className='me-1' />
                <Edit size={12} className='me-1' />
                <Trash size={12} className='me-1' />
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
                <Badge pill color='light-primary' className='me-1'>
                  Active
                </Badge>
              </td>
              <td>
                <Eye size={12} className='me-1' />
                <Edit size={12} className='me-1' />
                <Trash size={12} className='me-1' />
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
                <Badge pill color='light-primary' className='me-1'>
                  Active
                </Badge>
              </td>
              <td>
                <Eye size={12} className='me-1' />
                <Edit size={12} className='me-1' />
                <Trash size={12} className='me-1' />
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
                <Badge pill color='light-primary' className='me-1'>
                  Active
                </Badge>
              </td>
              <td>
                <Eye size={12} className='me-1' />
                <Edit size={12} className='me-1' />
                <Trash size={12} className='me-1' />
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
                <Badge pill color='light-primary' className='me-1'>
                  Active
                </Badge>
              </td>
              <td>
                <Eye size={12} className='me-1' />
                <Edit size={12} className='me-1' />
                <Trash size={12} className='me-1' />
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
                <Badge pill color='light-primary' className='me-1'>
                  Active
                </Badge>
              </td>
              <td>
                <Eye size={12} className='me-1' />
                <Edit size={12} className='me-1' />
                <Trash size={12} className='me-1' />
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
                <Badge pill color='light-primary' className='me-1'>
                  Active
                </Badge>
              </td>
              <td>
                <Eye size={12} className='me-1' />
                <Edit size={12} className='me-1' />
                <Trash size={12} className='me-1' />
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
                <Badge pill color='light-primary' className='me-1'>
                  Active
                </Badge>
              </td>
              <td>
                <Eye size={12} className='me-1' />
                <Edit size={12} className='me-1' />
                <Trash size={12} className='me-1' />
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
                <Badge pill color='light-primary' className='me-1'>
                  Active
                </Badge>
              </td>
              <td>
                <Eye size={12} className='me-1' />
                <Edit size={12} className='me-1' />
                <Trash size={12} className='me-1' />
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
                <Badge pill color='light-primary' className='me-1'>
                  Active
                </Badge>
              </td>
              <td>
                <Eye size={12} className='me-1' />
                <Edit size={12} className='me-1' />
                <Trash size={12} className='me-1' />
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
                <Badge pill color='light-primary' className='me-1'>
                  Active
                </Badge>
              </td>
              <td>
                <Eye size={12} className='me-1' />
                <Edit size={12} className='me-1' />
                <Trash size={12} className='me-1' />
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
                <Badge pill color='light-primary' className='me-1'>
                  Active
                </Badge>
              </td>
              <td>
                <Eye size={12} className='me-1' />
                <Edit size={12} className='me-1' />
                <Trash size={12} className='me-1' />
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
