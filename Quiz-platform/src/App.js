import {  Routes, Route } from "react-router-dom";
import Home from '../src/components/Home/Home';
import MyQuiz from '../src/Pages/My-Quiz/My-quiz';
import AddQuiz from '../src/Pages/Create_New_Quiz/new-Quiz';
import PlayQuiz from '../src/Pages/Play-Quiz/PlayQuiz';
import MCQSingle from '../src/Pages/Create_New_Quiz/MCQ-Single';
import PageNotFound from '../src/components/Home/PageNotFound';
import PlayQuizCard from '../src/Pages/Play-Quiz/playquizcard';

function App() {
  
  return (
    <div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Quiz" element={<MyQuiz/>} />
          <Route path="/newquiz" element={<AddQuiz/>} />
          <Route path="/PlayQuiz" element={<PlayQuiz/>} />
          <Route path="/newquiz/MCQSingle" element={<MCQSingle/>} />
          <Route path="/QuizCard" element={<PlayQuizCard/>} />
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>

    </div>
  );
}

export default App;
