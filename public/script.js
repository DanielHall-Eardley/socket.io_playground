state = {
  error: ''
}

window.onload = async () => {
  const response = await api('api', null, null, "GET")
  console.log(response.data.namespaces.length)
  const userList = document.querySelector('.user-list')
  for (let user of response.data.namespaces) {
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
  const p = document.createElement('p')
  p.innerText = state.error
  header.append(p)
} 


async function api (url, body, headers, method) {
  let res; 

  if (method === "GET") {
    res = await fetch("http://localhost:5000/" + url)
  } else {
    res = await fetch("http://localhost:5000/" + url, {
      headers: headers,
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

async function register (e) {
  e.preventDefault()

  const body = JSON.stringify({
    name: e.target.name.value
  })

  const headers = {
    'Content-Type': 'application/json'
  }
  console.log(body)
  const response = await api('api/signup', body, headers, 'POST')
  console.log(response)

  const userList = document.querySelector('.user-list')
  for (let user of response.data.namespaces) {
    const li = `
    <li class='list-result onclick='createRoom'>
      ${user.name}
      <input type='hidden' value=${user.id}/>
    </li>`

    userList.append(li)
  }
}

function message (e) {
  e.preventDefault()
  console.log(e)
}