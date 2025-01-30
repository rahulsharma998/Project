import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUsers } from "../utils/localStorageUtils";

const UserProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [todos, setTodos] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const users = getUsers();
        const selectedUser = users.find(u => u.id === parseInt(id));
        if (!selectedUser) {
            alert("User not Found!");
            navigate("/");
            return;
        }
        setUser(selectedUser);
        fetchData();
    }, [id, navigate]);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            await Promise.all([
                fetchResource(`https://jsonplaceholder.typicode.com/users/${id}/posts`, setPosts),
                fetchResource(`https://jsonplaceholder.typicode.com/users/${id}/comments`, setComments),
                fetchResource(`https://jsonplaceholder.typicode.com/users/${id}/todos`, setTodos),
                fetchResource(`https://jsonplaceholder.typicode.com/users/${id}/albums`, setAlbums),
                fetchResource(`https://jsonplaceholder.typicode.com/users/${id}/photos`, setPhotos)
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchResource = async (url, setter) => {
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Failed to fetch from ${url}`);
            const data = await res.json();
            setter(data);
        } catch (error) {
            console.error(error);
            alert(`Error fetching data: ${error.message}`);
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (!user) return <p>User not found. <button onClick={() => navigate("/")}>Back to Home</button></p>;

    return (
        <div>
            <h2>User Profile</h2>
            <button onClick={() => navigate("/")}>Back to Home</button>

            <h3>User Details</h3>
            <p><strong>Name: </strong>{user.name}</p>
            <p><strong>Email: </strong>{user.email}</p>
            <p><strong>Phone: </strong>{user.phone}</p>
            <p><strong>Address: </strong>{`${user.address?.street}, ${user.address?.city}, ${user.address?.zipcode}`}</p>
            <p><strong>Company: </strong>{user.company?.name}</p>
            <p><strong>Website: </strong>{user.website}</p>

            <h3>Posts</h3>
            {posts.map(post => (
                <div key={post.id}>
                    <h4>{post.title}</h4>
                    <p>{post.body}</p>
                </div>
            ))}

            <h3>Comments</h3>
            {comments.map(comment => (
                <div key={comment.id}>
                    <p>{comment.body}</p>
                </div>
            ))}

            <h3>Todos</h3>
            {todos.map(todo => (
                <div key={todo.id}>
                    <p>{todo.title} - {todo.completed ? "Completed" : "Pending"}</p>
                </div>
            ))}

            <h3>Albums</h3>
            {albums.map(album => (
                <div key={album.id}>
                    <p>{album.title}</p>
                </div>
            ))}

            <h3>Photos</h3>
            {photos.slice(0, 10).map(photo => (
                <img key={photo.id} src={photo.thumbnailUrl} alt={photo.title} />
            ))}
        </div>
    );
};

export default UserProfile;
