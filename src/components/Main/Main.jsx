import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    conversations,
    currentConversationId,
    loading,
    setInput,
    input,
    newChat
  } = useContext(Context);

  const handleSpeechRecognition = (language) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = language;

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setInput(speechToText);
    };

    recognition.start();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSent();
    }
  };

  const currentConversation = conversations.find(conv => conv.id === currentConversationId);

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {currentConversation ? (
          <div className="result">
            {currentConversation.messages.map((message, index) => (
              <div key={index} className="result-title">
                <img src={message.role === "user" ? assets.user_icon : assets.gemini_icon} alt="" />
                <p>{message.content}</p>
              </div>
            ))}
            {loading && (
              <div className="loader">
                <hr className="animated-bg" />
                <hr className="animated-bg" />
                <hr className="animated-bg" />
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="greet">
              <p><span>Hello, Dev.</span></p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input 
              onChange={(e) => setInput(e.target.value)} 
              value={input} 
              type="text" 
              placeholder="Enter a prompt here" 
              onKeyDown={handleKeyPress} // Ajout du gestionnaire d'événements
            />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img
                  src={assets.mic_icon}
                  width={30}
                  alt=""
                  onClick={() => handleSpeechRecognition("en-US")}
                />
                <p style={{ textAlign: 'center', margin: '0' }}>EN</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img
                  src={assets.mic_icon}
                  width={30}
                  alt=""
                  onClick={() => handleSpeechRecognition("fr-FR")}
                />
                <p style={{ textAlign: 'center', margin: '0' }}>FR</p>
              </div>
              {input && (
                <img onClick={() => onSent()} src={assets.send_icon} width={30} alt="" />
              )}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
