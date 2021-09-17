import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

let genId = 0;

export default function App() {
  const [threads, setThreads] = useState([]);

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
            return <ThreadPage thread={thread} />;
          }}
        />
        <Route path="/" exact>
          <AllThreadPage threads={threads} />
        </Route>
        <Route path="/new">
          <NewThreadPage
            onNewThread={(thread) => {
              setThreads([...threads, thread]);
            }}
          />
        </Route>
      </Switch>
    </Router>
  );
}

const ThreadPage = (props) => {
  const thread = props.thread;

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
    </div>
  );
};

const AllThreadPage = (props) => {
  const threads = props.threads;
  return (
    <div className="home">
      <div className="blog-list">
        {threads.map((threads) => {
          return (
            <div className="blog-preview">
              <div key={threads.id}>
                <Link to={`/thread/${threads.id}`}>
                  <div>name : {threads.topic}</div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

function NewThreadPage(props) {
  const [threadTopic, setThreadTopic] = useState("");
  const [threadBody, setThreadBody] = useState("");
  const [threadwriter, setThreadWriter] = useState("");

  const onNewThread = (e) => {
    e.preventDefault();
    props.onNewThread({
      id: genId++,
      topic: threadTopic,
      body: threadBody,
      writer: threadwriter,
    });

    setThreadBody("");
    setThreadTopic("");
    setThreadWriter("");
  };
  return (
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
  );
}
