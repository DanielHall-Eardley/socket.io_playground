state = {
  error: ''
}

window.onload = async () => {
  const res = await fetch("http://localhost:5000")
  console.log(res)
  if (parseInt(res.status) !== 200) {
    state.error = 'Server error'
    setError()
    return
  }

  const response = await res.json()

  if (!response.data.namespaces.length) {
    state.error = 'No results'
    setError()
    return
  }

  const userList = document.querySelector('.user-list')
  for (let user of response.data.namespaces.length) {
    const li = `
    <li class='list-result onclick='createRoom'>
      ${user.name}
      <input type='hidden' value=${user.id}/>
    </li>`

    userList.append(li)
  }
}

function setError () {
  const header = document.querySelector('header')
  console.log(header)
  header.append(`<p>${state.error}</p>`)
} 