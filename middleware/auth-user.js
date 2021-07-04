import Swal from "sweetalert2";
export default async function ({ $auth, redirect }) {
    let filterRolesByModerator = []
    let user = $auth.state.user
    console.log(user)

    filterRolesByModerator = user.Roles.filter(el => el.name == 'moderator' || el.name == 'admin')
    if (filterRolesByModerator.length > 0) {

    } else {

        redirect('/')
        Swal.fire("Opps!", "You don't have permission to access this route", "error");
    }

}