import React, { useContext } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Sidebar = () => {
  const { conversations, setCurrentConversationId, newChat } = useContext(Context);

  return (
    <div className='sidebar'>
      <div className="top">
        <img src={assets.menu_icon} alt="" className="menu" />
        <div onClick={newChat} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          <p>New Chat</p>
        </div>
        <div className="recent">
          <p className='recent-title'>Conversations</p>
          {conversations.map((conv, index) => (
            <div
              key={index}
              onClick={() => setCurrentConversationId(conv.id)}
              className="recent-entry"
            >
              <img src={assets.message_icon} alt="" />
              <p>Conversation {conv.id}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          <p>Help</p>
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          <p>Activity</p>
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          <p>Settings</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
