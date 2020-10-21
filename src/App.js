import React, {useEffect, useState} from 'react';
import ButtonRefresh from './components/ButtonRefresh';
import ButtonSend from './components/ButtonSend';
import Col from './components/Col';
import Heading3 from './components/Heading3';
import InputField from './components/InputField';
import MessageItem from './components/MessageItem';

function App() {
  const [chatRoomData, setChatRoomData] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    feeling: ""
  })
  const chatRoomURL = "https://mock-data-api.firebaseio.com/chatrooms/MF_cHwY2pj8e8zwu8eO.json"
  const messageURL = "https://mock-data-api.firebaseio.com/chatrooms/MF_cHwY2pj8e8zwu8eO/messages.json"


  function fetchChatRoomData() {
    fetch(chatRoomURL)
    .then(res => res.json())
    .then(data => {
      setChatRoomData(data)
    })
  }

  function handleSendMessage() {
    const payload = formData
    fetch(messageURL, {
      method: "POST",
      body: JSON.stringify(payload)
    })
    .then(res => {
      fetchChatRoomData()
      setFormData({
        name: "",
        message: "",
        feeling: ""
      })
    })
  }

  useEffect( () => {
    fetchChatRoomData()
    setInterval(fetchChatRoomData, 5000)
  }, [])

  function handleInputOnChange(e) {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  return (
    <div className="container">
      <div className="row">
        <Col size="12">
          <InputField 
            name="name"
            label="Enter your name"
            value={formData["name"]}
            handleOnChange={handleInputOnChange}
            placeholder="John Doe"
          />
          <InputField
            name="message"
            label="Enter your message"
            value={formData["message"]}
            handleOnChange={handleInputOnChange}
            placeholder="Hello.."
          />
          <InputField
            name="feeling"
            label="How are you feeling today?"
            value={formData["feeling"]}
            handleOnChange={handleInputOnChange}
            placeholder="Happy!"
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
              currentUser={formData.name}
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
