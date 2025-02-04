const UserCard = ({ userData }) => {
  return (
    <div className="user-card">
      <span>{userData.id}</span>
      <span>{userData.name}</span>
      <span>{userData.username}</span>
      <span>{userData.email}</span>
    </div>
  );
};

export default UserCard;
