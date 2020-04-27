state = {
  error: ''
}

window.onload = async () => {
  const response = await api('api', null, null, "GET")
  console.log(response)
  if (!response.data.namespaces?.length) {
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
  header.append(`<p>${state.error}</p>`)
} 

async function api (url, body, header, method) {
  let res; 

  if (method === "GET") {
    res = await fetch("http://localhost:5000/" + url)
  } else {
    res = await fetch("http://localhost:5000/" + url, {
      header: header,
      body: body,
      method: method
    })
  }
  
  if (parseInt(res.status) !== 200) {
    state.error = 'Server error'
    setError()
    return
  }

  return res.json()
}

function register (e) {
  e.preventDefault()
  console.log(e.target.name.value)
}

function message (e) {
  e.preventDefault()
  console.log(e)
}