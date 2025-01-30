import  { useEffect, useState } from "react";
import { addUser, editUser, getUsers } from "../utils/localStorageUtils";
import PropTypes from "prop-types";

const UserForm=({userId, onClose})=>{
    const [userData, setUserData]=useState({name:"" ,username:"",email:"",address:"",phone:"",website:"",company:""});

    useEffect(()=>{
        if(userId){
            const users=getUsers();
            const user=users.find(u=>u.id===userId);
            if (user) setUserData(user);
        }
    },[userId]);

    const handleChange=(e)=>{
        setUserData({...userData,[e.target.name]:e.target.value});
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        if (!userData.email.includes("@")) {
            alert("Please enter a valid email!");
            return;
        }
        if(userId){
            editUser(userId,userData);
        }else{
            const newUser={...userData, id:Date.now()}
            addUser(newUser);
        }
        onClose();
    };

    const handleReset=()=>{
        setUserData({name:"" ,username:"",email:"",address:"",phone:"",website:"",company:""});
        onClose();
    }
    return(
        <form onSubmit={handleSubmit}>
            <h2>{userId?"Edit User":"Add User"}</h2>
            <input type="text" name="name" value={userData.name} onChange={handleChange} placeholder="Name" required />
            <input type="text" name="username" value={userData.username} onChange={handleChange} placeholder="Username" required />
            <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Email" required />
            <input type="text" name="address" value={userData.address} onChange={handleChange} placeholder="Address" required />
            <input type="tel" name="phone" value={userData.phone} onChange={handleChange} placeholder="Phone" required />
            <input type="text" name="website" value={userData.website} onChange={handleChange} placeholder="Website" required />
            <input type="text" name="company" value={userData.company} onChange={handleChange} placeholder="Company" required />
            <button type="submit">{userId ? "Saved Changes":"Add User"}</button>
            <button type="button" onClick={handleReset}>Close</button>
        </form>
    );
};
UserForm.propTypes = {
    userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onClose: PropTypes.func.isRequired,
};

UserForm.defaultProps = {
    userId: null,
};
export default UserForm;