import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

let genId = 0;
let genCommentId = 0;

export default function App() {
  const [threads, setThreads] = useState([]);

  const [threadTopic, setThreadTopic] = useState("");
  const [threadBody, setThreadBody] = useState("");
  const [threadwriter, setThreadWriter] = useState("");

  const [commentToppic, setCommentTopic] = useState("");
  const [commentWriter, setCommentWriter] = useState("");

  const onNewThread = (e) => {
    e.preventDefault();
    //topic.preventDefault();
    //body.preventDefault();
    //writer.preventDefault();
    setThreads([
      ...threads,
      {
        id: genId++,
        topic: threadTopic,
        body: threadBody,
        writer: threadwriter,
        comments: [],
      },
    ]);

    setThreadTopic("");
    setThreadBody("");
    setThreadWriter("");
  };
  const onNewComment = (e, threadId, topic, writer) => {
    e.preventDefault();
    setThreads(
      threads.map((thread) => {
        if (thread.id === threadId) {
          return {
            id: thread.id,
            topic: thread.topic,
            body: thread.body,
            writer: thread.writer,
            comments: thread.comments.concat({
              id: genCommentId++,

              topic,
              writer,
            }),
          };
        }
        return thread;
      })
    );
    setCommentTopic("");
    setCommentWriter("");
  };

  console.log(threads.comments, threads);
  return (
    <Router>
      <nav className="navbar">
        <h1>Clone Patip</h1>
        <div className="links">
          <Link to="/">Home </Link>
          <Link to="/new">Create</Link>
        </div>
      </nav>
      <Switch>
        <Route
          path="/thread/:id"
          children={(props) => {
            const id = props.match.params.id;
            const thread = threads.find(
              (findingThread) => findingThread.id === Number(id)
            );
            if (!thread) {
              return <div>Not Found</div>;
            }
            return (
              <div className="blog-details">
                <article>
                  <h2>{thread.topic}</h2>
                  <h4>Writen by {thread.writer}</h4>
                  <h6>{thread.body}</h6>
                </article>
                <div>
                  <form
                    onSubmit={(e) => {
                      onNewComment(e, thread.id, commentToppic, commentWriter);
                    }}
                  >
                    <div>
                      <span>Comment Topic : </span>
                      <textarea
                        value={commentToppic}
                        onChange={(topic) =>
                          setCommentTopic(topic.target.value)
                        }
                      />
                    </div>
                    <div>
                      <span>Comment Writer : </span>
                      <textarea
                        value={commentWriter}
                        onChange={(writer) =>
                          setCommentWriter(writer.target.value)
                        }
                      />
                    </div>
                    <button>Submit Comment</button>
                  </form>
                </div>
                <div>
                  {thread.comments.map((comments) => {
                    return (
                      <div key={comments.id}>
                        <div>
                          <div>comment : {comments.topic}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }}
        />
        <Route path="/new">
          <div className="create">
            <form onSubmit={onNewThread}>
              <div>
                <span>thread Topic : </span>
                <input
                  value={threadTopic}
                  onChange={(e) => setThreadTopic(e.target.value)}
                />
              </div>
              <div>
                <span>thread Body : </span>
                <textarea
                  value={threadBody}
                  onChange={(e) => setThreadBody(e.target.value)}
                />
              </div>
              <div>
                <span>thread writer : </span>
                <input
                  value={threadwriter}
                  onChange={(e) => setThreadWriter(e.target.value)}
                />
              </div>
              <button>New thread</button>
            </form>
          </div>
        </Route>
        <Route path="/">
          <div className="home">
            <div className="blog-list">
              {threads.map((threads) => {
                return (
                  <div key={threads.id} className="blog-preview">
                    <div>
                      <Link to={`/thread/${threads.id}`}>
                        <div>name: {threads.topic}</div>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}
