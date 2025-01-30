export const getUsers =()=>{
    const users=localStorage.getItem("users")
    return users ? JSON.parse(users):[];
};

export const addUser=(user)=>{
    if(isDuplicateUser(user.email)){
        alert("User with this email Already exist!");
        return;
    }

    const users=getUsers();
    users.push(user);
    saveUsers(users)
};

export const isDuplicateUser=(email)=>{
    const users=getUsers();
    return users.some(user=>user.email.toLowerCase()===email.toLowerCase());
};

export const editUser=(userId, updatedUser)=>{
    const users=getUsers();
    const userIndex=users.findIndex(user=>user.id===userId);
    if(userIndex!==-1){
        if(isDuplicateUser(updatedUser.email)&& users[userIndex].email!==updatedUser.email){
            alert("User with this email already exist!");
            return;
        }
        users[userIndex]={...users[userIndex],...updatedUser};
        saveUsers(users);
    }
};

export const deleteUser=(userId)=>{

    const users=getUsers();
    const filteredUsers=users.filter(user=>user.id!==userId);
    saveUsers(filteredUsers);
};

export const saveUsers=(users)=>{
    localStorage.setItem("users",JSON.stringify(users))
};