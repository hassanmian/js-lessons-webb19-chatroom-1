import React, {useEffect, useState, useRef} from 'react';
import ButtonRefresh from './components/ButtonRefresh';
import ButtonSend from './components/ButtonSend';
import Col from './components/Col';
import Heading3 from './components/Heading3';
import InputField from './components/InputField';
import MessageItem from './components/MessageItem';

function App() {
  const [chatRoomData, setChatRoomData] = useState(null)
  const chatRoomURL = "https://mock-data-api.firebaseio.com/chatrooms/MF_cHwY2pj8e8zwu8eO.json"
  const messageURL = "https://mock-data-api.firebaseio.com/chatrooms/MF_cHwY2pj8e8zwu8eO/messages.json"
  const nameInputRef = useRef()
  const messageInputRef = useRef()


  function fetchChatRoomData() {
    fetch(chatRoomURL)
    .then(res => res.json())
    .then(data => {
      setChatRoomData(data)
    })
  }

  function handleSendMessage() {
    const name = nameInputRef.current.value
    const message = messageInputRef.current.value
    const payload = {
      message: message,
      name: name
    }
    fetch(messageURL, {
      method: "POST",
      body: JSON.stringify(payload)
    })
    .then(res => fetchChatRoomData())
  }

  useEffect( () => {
    fetchChatRoomData()
  }, [])

  return (
    <div className="container">
      <div className="row">
        <Col size="12">
          <InputField 
            label="Enter your name"
            myRef={nameInputRef}
            placeholder="John Doe"
          />
          <InputField
            label="Enter your message"
            myRef={messageInputRef}
            placeholder="Hello.."
          />
          <ButtonSend handleOnClick={handleSendMessage} />
        </Col>
      </div>
      
      <div>
        <ButtonRefresh handleOnClick={fetchChatRoomData} />
      </div>

      <div className="row mt-5">
        {chatRoomData && <Heading3 heading={chatRoomData.name} /> }

        {chatRoomData && Object.entries(chatRoomData.messages).reverse().map((messageItem, index) => {
          return (
            <MessageItem 
              key={index}
              message={messageItem[1].message} 
              name={messageItem[1].name}
            />
          )
        })}

      </div>
    </div>
  );
}

export default App;
