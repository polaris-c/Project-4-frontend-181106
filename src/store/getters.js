const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  username: state => state.user.username,
  id: state => state.user.id,
  name: state => state.user.name,
  roles: state => state.user.roles,
  role: state => state.user.role
}
export default getters
