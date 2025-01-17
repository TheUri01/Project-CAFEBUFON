import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

import Header from '../Header/Header'
import Button from '../Button/Button'
import TextInput from '../Input/TextInput'
import Footer from '../Footer/Footer'

import Swal from 'sweetalert2'

const SignUp = () => {
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [role, setRole] = useState('6335369ee1caa255ab840cd4')

  const navigate = useNavigate()
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL ? `${process.env.REACT_APP_URL}` : `http://localhost:8000`}/role/one`).then((res) => {
      console.log(res.data._id)
      setRole(res.data._id)
    })
  }, [])

  const addUser = () => {
    if (password == rePassword) {
      axios
        .post(`${process.env.REACT_APP_URL ? `${process.env.REACT_APP_URL}` : `http://localhost:8000`}/auth/register`, {
          firstname,
          lastname,
          username,
          email,
          password,
          role,
        })
        .then(function (response) {
          Swal.fire({
            icon: 'success',
            title: 'Đăng ký thành công',
            text: 'Mời bạn xác nhận Email trước khi đăng nhập',
            // text: 'Tự động chuyển về trang đăng nhập...',
            showConfirmButton: false,
          })
          setTimeout(() => {
            navigate('/signin')
          }, 5000);
        })
        .catch(function (error) {
          console.log(error)
        })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Sai mật khẩu xác nhận',
        text: 'Mật khẩu xác nhận không trùng khớp.',
        confirmButtonColor: '#3d685e',
      })
    }
  }
  return (
    <div className="relative min-h-screen pb-24 text-center lg:pb-12 bg-tertiary-cont sm:bg-background">
      <Header />
      <div className="mx-2 sm:mx-8 lg:mx-auto lg:px-24 my-[64px] max-w-[1440px] bg-tertiary-cont sm:bg-background">
        <div className="flex flex-col gap-10 text-center">
          {/* col-2-2 */}
          <div className="grid h-full grid-cols-12 gap-6 lg:h-full">
            {/* col-tilte */}
            <div className="hidden md:flex md:flex-col col-span-12 lg:col-span-6 justify-center text-left items-start gap-[24px]">
              <h2 className="text-h2 text-tertiary">Bug Ổn xin chào</h2>
              <d1 className="text-black text-d1">
                Đăng kí thành viên của Bug ổn với vài bước ❤️
              </d1>
            </div>
            {/* col-signin */}
            <div className="grid grid-cols-2 items-center mx-0 sm:mx-20 !py-20 lg:mx-0 !px-4 sm:!px-14 bg-tertiary-cont col-span-12 lg:col-span-6 rounded-[24px] gap-4">
              <h1 className="col-span-2 text-left text-h2 text-on-secondary-cont">
                Tạo tài khoản
              </h1>
              <form
                onSubmit={addUser}
                className="grid grid-cols-2 col-span-2 gap-2"
              >
                <div className="col-span-1">
                  <TextInput
                    name="lastName"
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                    placeholder="Họ"
                    className={'w-full'}
                  />
                </div>
                <div className="col-span-1">
                  <TextInput
                    name="firstName"
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                    placeholder="Tên"
                    className={'w-full'}
                  />
                </div>
                <div className="col-span-2">
                  <TextInput
                    name="username"
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder="Tên đăng nhập"
                    className={'w-full'}
                  />
                </div>
                <div className="col-span-2">
                  <TextInput
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Mật khẩu"
                    className={'w-full'}
                  />
                </div>
                <div className="col-span-2">
                  <TextInput
                    name="re-password"
                    onChange={(e) => setRePassword(e.target.value)}
                    type="password"
                    placeholder="Xác nhận mật khẩu"
                    className={'w-full'}
                  />
                </div>
                <div className="col-span-2">
                  <TextInput
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                    className={'w-full'}
                  />
                </div>
              </form>

              <div className="flex justify-center col-span-2">
                <Button
                  type="button"
                  btnStyle="btn-tertiary"
                  btnCSS={'w-full'}
                  icon="login"
                  onClick={addUser}
                >
                  Tạo tài khoản
                </Button>
              </div>

              <div className="flex justify-between col-span-2 m-3 ">
                <Button
                  type="button"
                  btnStyle="btn-tonal"
                  btnCSS={'w-full'}
                  icon=""
                  onClick={() => {
                    navigate('/signin')
                  }}
                >
                  Đăng nhập
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default SignUp
