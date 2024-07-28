import React, { useEffect, useState } from "react";
import Pusher from 'pusher-js'

function App() {
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const allMessages = [];

  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher('0892de745459e6a870a4', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', function (data) {
      allMessages.push(data);
      setMessages(allMessages);
    });
  }, [])

  const submit = async (e) => {
    e.preventDefault();
   

    await fetch('http://localhost:8000/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        message
      })
    });
    setMessage('');
  }

  return (
    <div className="container">
      <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary">
        <div className="d-flex align-items-center flex-shrink-0 p-3 link-body-emphasis text-decoration-none border-bottom">
          <input type="text" className="fs-5 fw-semibold border-none " placeholder="enter your name" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="list-group list-group-flush border-bottom scrollarea" >

          {
            messages.map((messageItem) => {
              return (
                <div>
                <div className="list-group-item list-group-item-action py-3 lh-sm ">
                  <div className="d-flex w-100 align-items-center justify-content-between">
                    <strong className="mb-1"> {messageItem.username} </strong>

                  </div>
                  <div className="col-10 mb-1 small">{messageItem.message}</div>

                </div>
                </div>
              )
            })
          }


        </div>
      </div>

      <form onSubmit={e => submit(e)}>
        <input type="text" className="form-control" placeholder="write a message" value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>

    </div>
  )
}

export default App
