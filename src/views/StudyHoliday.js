// ** React Imports
import { Fragment, useState, forwardRef } from 'react'

// ** Table Data & Columns
import { data } from './Table/data'

import { Link } from 'react-router-dom'

import { Plus, User, Eye, Check, X } from 'react-feather'

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

import Select from 'react-select'
// ** Icons Imports
import { MoreVertical, Edit, Trash } from 'react-feather'
import "./Table/HostFamily.css"
import { useForm, Controller } from 'react-hook-form'
import { selectThemeColors } from '@utils'

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className='form-check'>
    <Input type='checkbox' ref={ref} {...props} />
  </div>
))
const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'suspended', label: 'Suspended' }
]
const countryOptions = [
  { value: 'uk', label: 'UK' },
  { value: 'usa', label: 'USA' },
  { value: 'france', label: 'France' },
  { value: 'russia', label: 'Russia' },
  { value: 'canada', label: 'Canada' }
]

const languageOptions = [
  { value: 'english', label: 'English' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'french', label: 'French' },
  { value: 'german', label: 'German' },
  { value: 'dutch', label: 'Dutch' }
]

const defaultValues = {
  firstName: 'Bob',
  lastName: 'Barton',
  username: 'bob.dev'
}
const onSubmit = data => {
  if (Object.values(data).every(field => field.length > 0)) {
    return null
  } else {
    for (const key in data) {
      if (data[key].length === 0) {
        setError(key, {
          type: 'manual'
        })
      }
    }
  }
}
const DataTableWithButtons = () => {
  // ** States
  const [show, setShow] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])

  const [modalOpened, setModalOpened] = useState(false)

  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

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
        <Table responsive>
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
                <User size={12}  onClick={() => setShow(true)}/>
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
                <User size={12}  onClick={() => setShow(true)}/>
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
                <User size={12}  onClick={() => setShow(true)}/>
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
                <User size={12}  onClick={() => setShow(true)}/>
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
                <User size={12}  onClick={() => setShow(true)}/>
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
                <User size={12}  onClick={() => setShow(true)}/>
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
                <User size={12}  onClick={() => setShow(true)}/>
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
                <User size={12}  onClick={() => setShow(true)}/>
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
                <User size={12}  onClick={() => setShow(true)}/>
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
                <User size={12}  onClick={() => setShow(true)}/>
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
                <User size={12}  onClick={() => setShow(true)}/>
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
                <User size={12} onClick={() => setShow(true)} />
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
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Edit User Information</h1>
            <p>Updating user details will receive a privacy audit.</p>
          </div>
          <Row tag='form' className='gy-1 pt-75' onSubmit={handleSubmit(onSubmit)}>
            <Col md={6} xs={12}>
              <Label className='form-label' for='firstName'>
                First Name
              </Label>
              <Controller
                control={control}
                name='firstName'
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      id='firstName'
                      placeholder='John'
                      value={field.value}
                      invalid={errors.firstName && true}
                    />
                  )
                }}
              />
              {errors.firstName && <FormFeedback>Please enter a valid First Name</FormFeedback>}
            </Col>
            <Col md={6} xs={12}>
              <Label className='form-label' for='lastName'>
                Last Name
              </Label>
              <Controller
                name='lastName'
                control={control}
                render={({ field }) => (
                  <Input {...field} id='lastName' placeholder='Doe' invalid={errors.lastName && true} />
                )}
              />
              {errors.lastName && <FormFeedback>Please enter a valid Last Name</FormFeedback>}
            </Col>
            <Col xs={12}>
              <Label className='form-label' for='username'>
                Username
              </Label>
              <Controller
                name='username'
                control={control}
                render={({ field }) => (
                  <Input {...field} id='username' placeholder='john.doe.007' invalid={errors.username && true} />
                )}
              />
              {errors.username && <FormFeedback>Please enter a valid Username</FormFeedback>}
            </Col>
            <Col md={6} xs={12}>
              <Label className='form-label' for='email'>
                Billing Email
              </Label>
              <Input type='email' id='email' placeholder='example@domain.com' />
            </Col>
            <Col md={6} xs={12}>
              <Label className='form-label' for='status'>
                Status:
              </Label>
              <Select
                id='status'
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={statusOptions}
                theme={selectThemeColors}
                defaultValue={statusOptions[0]}
              />
            </Col>
            <Col md={6} xs={12}>
              <Label className='form-label' for='tax-id'>
                Tax ID
              </Label>
              <Input id='tax-id' defaultValue='Tax-8894' placeholder='Tax-1234' />
            </Col>
            <Col md={6} xs={12}>
              <Label className='form-label' for='contact'>
                Contact
              </Label>
              <Input id='contact' defaultValue='+1 609 933 4422' placeholder='+1 609 933 4422' />
            </Col>
            <Col md={6} xs={12}>
              <Label className='form-label' for='language'>
                Language
              </Label>
              <Select
                id='language'
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={languageOptions}
                theme={selectThemeColors}
                defaultValue={languageOptions[0]}
              />
            </Col>
            <Col md={6} xs={12}>
              <Label className='form-label' for='country'>
                Country
              </Label>
              <Select
                id='country'
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={countryOptions}
                theme={selectThemeColors}
                defaultValue={countryOptions[0]}
              />
            </Col>
            <Col xs={12}>
              <div className='d-flex align-items-center'>
                <div className='form-switch'>
                  <Input type='switch' defaultChecked id='billing-switch' name='billing-switch' />
                  <Label className='form-check-label' htmlFor='billing-switch'>
                    <span className='switch-icon-left'>
                      <Check size={14} />
                    </span>
                    <span className='switch-icon-right'>
                      <X size={14} />
                    </span>
                  </Label>
                </div>
                <Label className='form-check-label fw-bolder' htmlFor='billing-switch'>
                  Use as a billing address?
                </Label>
              </div>
            </Col>
            <Col xs={12} className='text-center mt-2 pt-50'>
              <Button type='submit' className='me-1' color='primary'>
                Submit
              </Button>
              <Button type='reset' color='secondary' outline onClick={() => setShow(false)}>
                Discard
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default DataTableWithButtons
