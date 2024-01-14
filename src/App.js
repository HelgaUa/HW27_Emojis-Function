import React, {useState, useEffect} from "react";
import './App.css';
import Button from './components/Button.js';
import Emoji from "./components/Emoji.js";
import Emoji1 from './images/1.png'
import Emoji2 from './images/2.png'
import Emoji3 from './images/3.png'
import Emoji4 from './images/4.png'
import Emoji5 from './images/5.png'

const LOCAL_STORAGE_KEY = 'emj';

const data = [
    {id: 'Emoji-smile', src: Emoji1, alt: 'Emoji-smile'},
    {id: 'Emoji-party', src: Emoji2, alt: 'Emoji-party'},
    {id: 'Emoji-wink', src: Emoji3, alt: 'Emoji-wink'},
    {id: 'Emoji-hearts', src: Emoji4, alt: 'Emoji-hearts'},
    {id: 'Emoji-sunglasses', src: Emoji5, alt: 'Emoji-sunglasses'}
];

function App() {
    const [emojiCounters, setEmojiCounters] = useState({});
    const [winner, setWinner] = useState();

    useEffect(() => {
            const localStorageData = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (localStorageData !== null) {
                setEmojiCounters(JSON.parse(localStorageData));
            }
        }
        ,
        []
    );

    const onEmojiClick = (id) => {
        setEmojiCounters((prevCounters) => {
            const updatedCounters = {...prevCounters};

            updatedCounters[id] === undefined ? (updatedCounters[id] = 1) : updatedCounters[id]++;
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedCounters));

            return updatedCounters;
        });
    };

    const onShowResultsClick = () => {
        let winnerVotes = 0;
        let winnerId = undefined;
        for (const emojiId in emojiCounters) {
            if (emojiCounters[emojiId] > winnerVotes) {
                winnerVotes = emojiCounters[emojiId];
                winnerId = emojiId;
            }
        }
        setWinner(winnerId);
    };

    const onResetClick = () => {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        setEmojiCounters({});
        setWinner(undefined);
    }

    return (
        <div className="App">
            <h1>Голосування за найкращий смайлик</h1>
            {data.map((emoji) => {
                return (
                    <div key={emoji.id} className='emoji-wrapper'>
                        <Emoji
                            id={emoji.id}
                            src={emoji.src}
                            onClick={onEmojiClick}
                            alt={emoji.alt}
                        />
                        <span className='number-of-clicks'>{emojiCounters[emoji.id] || 0}</span>
                    </div>
                )
            })}
            <br/>
            <Button
                className='btn-outline-success'
                name='Show results'
                onClick={onShowResultsClick}
            />

            <Button
                className='btn-outline-danger'
                name='Reset'
                onClick={onResetClick}
            />

            <div className='winner-img'>
                {winner && (
                    <div>
                        <h2>Результати голосування</h2>
                        <h3>Переможець:</h3>
                        <img src={data.find((emoji) => emoji.id === winner).src}
                             className='winner-emoji'
                             alt="Winner-emoji"/>
                        <p>{`Кількість голосів: ${emojiCounters[winner] || 0}`}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default App;
