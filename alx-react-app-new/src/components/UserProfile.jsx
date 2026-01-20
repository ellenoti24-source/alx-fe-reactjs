const UserProfile = (props) => {
    return (
        <div style={{
            border: '1px solid gray',
            padding: '15px',
            margin: '10px',
            borderRadius: '10px',
            backgroundColor: '#f0f8ff'
        }}>
            <h2 style={{ color: 'blue', fontSize: '24px' }}>{props.name}</h2>
            <p>Age: <span style={{ fontWeight: 'bold' }}>{props.age}</span></p>
            <p>Bio: {props.bio}</p>
        </div>
    );
};

export default UserProfile;