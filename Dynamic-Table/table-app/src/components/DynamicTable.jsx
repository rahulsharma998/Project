import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const DynamicTable=()=>{
  const navigate=useNavigate();
  const [users, setUsers]=useState([]);
  const [sortKey, setSortKey]=useState("")
  const [searchTerm, setSearchTerm]=useState("");
  const [sortOrder, setSortOrder]=useState("asc");

  useEffect (()=>{
    const fetchUser=async()=>{
      const res=await fetch("https://jsonplaceholder.typicode.com/users")
      const data =await res.json();
      setUsers(data.map(({id,name,email,phone})=>({id,name,email,phone})));
    };
    fetchUser();
  },[]);

  const handleDeleteUser=(id)=>{
    const confirmDelete=window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete){
    setUsers(users.filter((user)=>user.id!==id));
  }
  };

  const handleSort=()=>{

    if(!sortKey){
      alert("please select a column to sort by.");
      return
    }
    const sortedUsers=[...users].sort((a,b)=>{
      const aValue=a[sortKey];
      const bValue=b[sortKey];

      if(typeof aValue==="number" || !isNaN(Number(aValue))){
        return sortOrder==="asc"? aValue-bValue : bValue-aValue;
      }else{
        return sortOrder==="asc"
        ? aValue.toString().localeCompare(bValue.toString()) 
        : bValue.toString().localeCompare(aValue.toString());
      }
    });
    setUsers(sortedUsers);
    setSortOrder(sortOrder==="asc"?"dsc":"asc");
  };
  const filterUsers=users.filter((user)=>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return(
    <div style={{padding:"20px"}}>
      <h2>User Management Table</h2>
      <div style={{marginBottom:"20px"}}>
        <input type="text" placeholder="Search by Name" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
      </div>
      <div>
        <select value={sortKey} onChange={(e)=>setSortKey(e.target.value)}>
          <option value="">Select Column</option>
          <option value="id">ID</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
        </select>
        <button onClick={handleSort}>Sort({sortOrder==="asc"?"Ascending":"Descending"})</button>
      </div>

      <table border="1" style={{borderCollapse:"collapse",width: "100%"}}>
        <thead>
          <tr>
            <th >ID</th>
            <th >Name</th>
            <th >Email</th>
            <th >Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filterUsers.map((user)=>(
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button onClick={() => navigate(`/edit-user/${user.id}`)}>Edit</button>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                <button onClick={() => navigate(`/users/${user.id}`)}>View Profile</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate("/add-user")}>Add User</button>
    </div>
  )
}
export default DynamicTable;