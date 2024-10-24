import React from 'react'
import "./ChatUI.css";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { IoIosCall } from "react-icons/io";

function ChatUI() {
  return (
    <>
      <div className=" clearfix5922">
        <div className="peoplelist5922" id="people-list">
          <div className="search">
            <input type="text" placeholder="search" />
            <i className="fa fa-search" />
          </div>
          <ul className="list">
            <li className="clearfix">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg"
                alt="avatar"
              />
              <div className="about">
                <div className="name">Vincent Porter</div>
                <div className="status">
                  <i className="fa fa-circle online" /> online
                </div>
              </div>
            </li>
            <li className="clearfix">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg"
                alt="avatar"
              />
              <div className="about">
                <div className="name">Aiden Chavez</div>
                <div className="status">
                  <i className="fa fa-circle offline" /> left 7 mins ago
                </div>
              </div>
            </li>
            <li className="clearfix">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_03.jpg"
                alt="avatar"
              />
              <div className="about">
                <div className="name">Mike Thomas</div>
                <div className="status">
                  <i className="fa fa-circle online" /> online
                </div>
              </div>
            </li>
            <li className="clearfix">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_04.jpg"
                alt="avatar"
              />
              <div className="about">
                <div className="name">Erica Hughes</div>
                <div className="status">
                  <i className="fa fa-circle online" /> online
                </div>
              </div>
            </li>
            <li className="clearfix">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_05.jpg"
                alt="avatar"
              />
              <div className="about">
                <div className="name">Ginger Johnston</div>
                <div className="status">
                  <i className="fa fa-circle online" /> online
                </div>
              </div>
            </li>
            <li className="clearfix">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_06.jpg"
                alt="avatar"
              />
              <div className="about">
                <div className="name">Tracy Carpenter</div>
                <div className="status">
                  <i className="fa fa-circle offline" /> left 30 mins ago
                </div>
              </div>
            </li>
            <li className="clearfix">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_07.jpg"
                alt="avatar"
              />
              <div className="about">
                <div className="name">Christian Kelly</div>
                <div className="status">
                  <i className="fa fa-circle offline" /> left 10 hours ago
                </div>
              </div>
            </li>
            <li className="clearfix">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_08.jpg"
                alt="avatar"
              />
              <div className="about">
                <div className="name">Monica Ward</div>
                <div className="status">
                  <i className="fa fa-circle online" /> online
                </div>
              </div>
            </li>
            <li className="clearfix">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_09.jpg"
                alt="avatar"
              />
              <div className="about">
                <div className="name">Dean Henry</div>
                <div className="status">
                  <i className="fa fa-circle offline" /> offline since Oct 28
                </div>
              </div>
            </li>
            <li className="clearfix">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_10.jpg"
                alt="avatar"
              />
              <div className="about">
                <div className="name">Peyton Mckinney</div>
                <div className="status">
                  <i className="fa fa-circle online" /> online
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="chat59222">
          <div className="chat-header clearfix">
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg"
              alt="avatar"
            />
            <div className="chat-about">
              <div className="chat-with">Chat with Vincent Porter</div>
              <div className="chat-num-messages">already 1 902 messages</div>
            </div>
            <div>
              <p className="float-right text-white cursor-pointer">
                <BsFillCameraVideoFill />
              </p>
              <p className="float-right text-white cursor-pointer mr-4">
                <IoIosCall />
              </p>
            </div>
            {/* <i className="fa fa-star" /> */}
          </div>{" "}
          {/* end chat-header */}
          <div className="chat-history">
            <ul>
              <li className="clearfix">
                <div className="message-data alignright5922">
                  <span className="message-data-time">10:10 AM, Today</span>{" "}
                  &nbsp; &nbsp;
                  <span className="message-data-name">Olia</span>{" "}
                  <i className="fa fa-circle me" />
                </div>
                <div className="message other-message float-right mt-3">
                  Hi Vincent, how are you? How is the project coming along?
                </div>
              </li>
              <li>
                <div className="messagedata5922">
                  <span className="message-data-name">
                    <i className="fa fa-circle online" /> Vincent
                  </span>
                  <span className="message-data-time">10:12 AM, Today</span>
                </div>
                <div className="message my-message mt-3">
                  Are we meeting today? Project has been already finished and I
                  have results to show you.
                </div>
              </li>
              <li className="clearfix">
                <div className="message-data alignright5922">
                  <span className="message-data-time">10:14 AM, Today</span>{" "}
                  &nbsp; &nbsp;
                  <span className="message-data-name">Olia</span>{" "}
                  <i className="fa fa-circle me" />
                </div>
                <div className="message other-message float-right mt-3 ">
                  Well I am not sure. The rest of the team is not here yet.
                  Maybe in an hour or so? Have you faced any problems at the
                  last phase of the project?
                </div>
              </li>
              <li>
                <div className="messagedata5922">
                  <span className="message-data-name">
                    <i className="fa fa-circle online" /> Vincent
                  </span>
                  <span className="message-data-time">10:20 AM, Today</span>
                </div>
                <div className="message my-message mt-3">
                  Actually everything was fine. I'm very excited to show this to
                  our team.
                </div>
              </li>
              <li>
                {/* <div className="messagedata5922">
                  <span className="message-data-name">
                    <i className="fa fa-circle online" /> Vincent
                  </span>
                  <span className="message-data-time">10:31 AM, Today</span>
                </div> */}
                <i className="fa fa-circle online" />
                <i
                  className="fa fa-circle online"
                  style={{ color: "#AED2A6" }}
                />
                <i
                  className="fa fa-circle online"
                  style={{ color: "#DAE9DA" }}
                />
              </li>
            </ul>
          </div>{" "}
          {/* end chat-history */}
          <div className="chat-message clearfix">
            <textarea
              name="message-to-send"
              id="message-to-send"
              placeholder="Type your message"
              rows={3}
              defaultValue={""}
            />
            <i className="fa fa-file-o" /> &nbsp;&nbsp;&nbsp;
            <i className="fa fa-file-image-o" />
            <button>Send</button>
          </div>{" "}
          {/* end chat-message */}
        </div>{" "}
        {/* end chat */}
      </div>{" "}
      {/* end container */}
    </>
  );
}

export default ChatUI;
