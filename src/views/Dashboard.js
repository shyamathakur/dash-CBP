import {
  CardHeader,
  CardBody,
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  ModalBody,
  DropdownToggle,
  ModalHeader,
  Badge,
  CardText
} from "reactstrap";
// ** React Imports
import { useState, forwardRef } from 'react'

// ** Table Data & Columns
import { data } from './Table/data'
import { MessageSquare, Settings, Bell, Check, X ,ArrowLeft} from 'react-feather'
import Select from 'react-select'
import "./Table/HostFamily.css"
import { useForm, Controller } from 'react-hook-form'
import { selectThemeColors } from '@utils'
import Avatar from "@components/avatar";
import defaultAvatar from "@src/assets/images/portrait/small/avatar-s-11.jpg";


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

const Dashboard = () => {
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
    <div>
      <Card>
        <CardHeader style={{ justifyContent: "space-between" }}>
          <CardText><ArrowLeft/> Profile setting</CardText>
          <CardText style={{ display: "flex",alignItems:'center',gap:"20px" }}>
            <div className='position-relative'>
              <Badge pill color='danger' className='badge-up'>
                5
              </Badge>
              <Bell size={21} />
            </div>
            <Settings size={21} className='' />
            <Avatar
              img={defaultAvatar}
              imgHeight="40"
              imgWidth="40"
              status="online"
            />
          </CardText>
        </CardHeader>
      </Card>
      <Card>
        <CardBody className='modal-dialog-centered modal-lg'>
          <ModalBody className='px-sm-5 mx-50 pb-5'>
            <div className='text-center mb-2'>
              <Avatar
                img={defaultAvatar}
                imgHeight="140"
                imgWidth="140"
                status="online"
              />
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
        </CardBody>
      </Card>
    </div>
  );
};

export default Dashboard;
