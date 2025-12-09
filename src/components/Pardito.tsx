import {useState} from 'react'
import userService from '../services/user-service'
import './Pardito.css'

export default function Pardito() {
  const [userName, setUserName] = useState(userService.getUserName());
  return (
    <div className='pardito'>
      <img src="/src/assets/math_pardo_pardito1.png" alt="" />
      <div className="input-group m-2">
        <input className='form-control' type="text" value={userName} onChange={(e) => setUserName(e.target.value)} onBlur={() => userService.setUserName(userName)} />
        <div className="input-group-append">
          <span className="input-group-text" id="basic-addon2"><i className='material-symbols-outlined'>edit</i></span>
        </div>
      </div>
    </div>
  )
}
