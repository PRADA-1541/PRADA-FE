import React, { useState } from 'react';
import './Survey.scss';
import ailogo from '../assets/images/logo/chat_black.png';
import AmarrettoSourAndBellini from '../assets/images/survey/AmarettoSour&Bellini.png';
import ManhattanAndCosmopolitan from '../assets/images/survey/Manhattan&Cosmopolitan.png';
import MojitoAndSideCar from '../assets/images/survey/Mojito&Sidecar.png';
import BetweenTheSheetsAndNegroni from '../assets/images/survey/BetweenTheSheets&Negroni.png';
import VodkaMartiniAndVesper from '../assets/images/survey/VodkaMartini&Vesper.png';
import DarkNStormyAndLongIslandIcedTea from '../assets/images/survey/DarkNStormy&LongIslandIcedTea.png';
import AlexanderAndWhiteRussian from '../assets/images/survey/Alexander&WhiteRussian.png';
import MoscowMuleAndCaipirinha from '../assets/images/survey/MoscowMule&Caipirinha.png';
import EspressoMartiniAndIrishCoffee from '../assets/images/survey/EspressoMartini&IrishCoffee.png';
import BlueHawaiiAndPinaColada from '../assets/images/survey/BlueHawaii&PinaColada.png';
import SingaporeSlingAndKirRoyalAndStrawberryMargarita from '../assets/images/survey/SingaporeSling&KirRoyal&StrawberryMargarita.png';
import ScrewDriverAndCampariOrange from '../assets/images/survey/ScrewDriver&CampariOrange.png';
import { UserSurvey } from '../api/recommendation';
import { useNavigate } from 'react-router-dom';

const Survey = () => {
  const [firstAnswer, setFirstAnswer] = useState(0);
  const [secondAnswer, setSecondAnswer] = useState([]);
  const [thirdAnswer, setThirdAnswer] = useState([]);
  const [fourthAnswer, setFourthAnswer] = useState([]);
  const [fifthAnswer, setFifthAnswer] = useState(0);
  const navigate = useNavigate();

  const secondAnswerMapper = {
    1: ['Bellini', 'Mimosa', 'Paradise', 'Amaretto Sour'],
    2: ['Black Russian', 'Manhattan', 'Cosmopolitan', 'Old Fashioned', 'Whiskey Cola'],
    3: ['Mojito', 'Cosmopolitan', 'Sidecar', 'Margarita'],
    4: ['Negroni', 'Between the Sheets', 'Campari Fizz', 'Campari Orange'],
    5: ['Martini', 'Vesper', 'Gimlet', 'Vodka Martini'],
    6: ['A.M.F', 'Long Island Iced Tea', 'Zombie', "Dark 'N' Stormy"],
  };
  const thirdAnswerMapper = {
    1: ['Alexander', 'Grasshopper', 'B-52', 'White Russian'],
    2: ['Moscow Mule', 'Sea Breeze', 'Caipirinha', 'Cape Cod', 'Blue Lagoon'],
    3: ['Black Russian', 'White Russian', 'Espresso Martini', 'Irish Coffee'],
    4: ['Blue Hawaii', 'Hurricane', 'Mai Tai', 'Pina Colada', 'Zombie'],
    5: ['Singapore Sling', 'Cosmopolitan', 'Strawberry Margarita', 'Kir Royal'],
    6: ['Screw Driver', 'Campari Orange', 'Bacardi', 'Sidecar'],
  };
  const fourthAnswerMapper = {
    1: '위스키',
    2: '보드카',
    3: '진',
    4: '럼',
    5: '테킬라',
    6: '브랜디+와인+샴페인',
  };

  const submitSurvey = async (e) => {
    e.preventDefault();
    if (firstAnswer === 0) {
      alert('첫 번째 문항을 선택해주세요.');
      return;
    }
    if (secondAnswer.length === 0) {
      alert('두 번째 문항을 선택해주세요.');
      return;
    }
    if (thirdAnswer.length === 0) {
      alert('세 번째 문항을 선택해주세요.');
      return;
    }
    if (fourthAnswer.length === 0) {
      alert('네 번째 문항을 선택해주세요.');
      return;
    }
    if (fifthAnswer === 0) {
      alert('다섯 번째 문항을 선택해주세요.');
      return;
    }

    const cocktails = [];
    secondAnswer.forEach((item) => {
      cocktails.push(...secondAnswerMapper[item]);
    });
    thirdAnswer.forEach((item) => {
      cocktails.push(...thirdAnswerMapper[item]);
    });
    const bases = [];
    if (fourthAnswer[0] !== 7) {
      fourthAnswer.forEach((item) => {
        bases.push(fourthAnswerMapper[item]);
      });
    }
    const res = await UserSurvey(cocktails, bases);
    if (res) {
      alert('답변이 제출되었습니다.');
      navigate('/');
    }
  };

  const handleSecondAnswer = (e) => {
    const value = parseInt(e.target.value);
    if (secondAnswer.includes(value)) {
      setSecondAnswer(secondAnswer.filter((item) => item !== value));
    } else {
      setSecondAnswer([...secondAnswer, value]);
    }
  };

  const handleThirdAnswer = (e) => {
    const value = parseInt(e.target.value);
    if (thirdAnswer.includes(value)) {
      setThirdAnswer(thirdAnswer.filter((item) => item !== value));
    } else {
      setThirdAnswer([...thirdAnswer, value]);
    }
  };

  const handleFourthAnswer = (e) => {
    const value = parseInt(e.target.value);
    if (value === 7) {
      setFourthAnswer([value]);
      return;
    }
    if (fourthAnswer.includes(value)) {
      setFourthAnswer(fourthAnswer.filter((item) => item !== value));
    } else if (fourthAnswer[0] === 7) {
      setFourthAnswer([value]);
    } else {
      setFourthAnswer([...fourthAnswer, value]);
    }
  };

  return (
    <form className='surveyContainer' onSubmit={submitSurvey}>
      <p className='surveyDescription'>
        <img src={ailogo} style={{ width: '3rem' }} />
        AI가 당신에게 맞는 칵테일을 추천해주기 위한 간단한 질문들을 준비했어요. 차근차근 확인 후 답변을 등록해주세요!
      </p>
      <p className='question' style={{ marginTop: '1rem' }}>
        평소 칵테일 문화를 즐기시나요?
      </p>
      <label htmlFor='1-1'>
        <input type='radio' id='1-1' name='1' value={1} onChange={(e) => setFirstAnswer(e.target.value)} />
        <span>술은 별로...</span>
      </label>
      <label htmlFor='1-2'>
        <input type='radio' id='1-2' name='1' value={2} onChange={(e) => setFirstAnswer(e.target.value)} />
        <span>소주 맥주는 좋아하는데 칵테일은 생소해요.</span>
      </label>
      <label htmlFor='1-3'>
        <input type='radio' id='1-3' name='1' value={3} onChange={(e) => setFirstAnswer(e.target.value)} />
        <span>몇 번 마셔봤어요.</span>
      </label>
      <label htmlFor='1-4'>
        <input type='radio' id='1-4' name='1' value={4} onChange={(e) => setFirstAnswer(e.target.value)} />
        <span>아주 좋아해요.</span>
      </label>
      <label htmlFor='1-5'>
        <input type='radio' id='1-5' name='1' value={5} onChange={(e) => setFirstAnswer(e.target.value)} />
        <span>환장해요.</span>
      </label>
      <p className='question'>당신이 선호하는 칵테일의 맛은 어떤 취향인가요?(1/2)</p>
      <div className='cocktailsGrid'>
        <label className={secondAnswer.includes(1) ? 'checked' : null} htmlFor='2-1'>
          <input
            type='checkbox'
            id='2-1'
            name='2'
            value={1}
            onChange={handleSecondAnswer}
            checked={secondAnswer.includes(1)}
          />
          <span>새콤 달콤</span>
          <img src={AmarrettoSourAndBellini} />
          <p>ex) 벨리니, 미모사, 아마레또 사워, ...</p>
        </label>
        <label className={secondAnswer.includes(2) ? 'checked' : null} htmlFor='2-2'>
          <input
            type='checkbox'
            id='2-2'
            name='2'
            value={2}
            onChange={handleSecondAnswer}
            checked={secondAnswer.includes(2)}
          />
          <span>달콤 쌉싸름</span>
          <img src={ManhattanAndCosmopolitan} />
          <p>ex) 블랙 러시안, 맨하탄, 코스모 폴리탄, ...</p>
        </label>
        <label className={secondAnswer.includes(3) ? 'checked' : null} htmlFor='2-3'>
          <input
            type='checkbox'
            id='2-3'
            name='2'
            value={3}
            onChange={handleSecondAnswer}
            checked={secondAnswer.includes(3)}
          />
          <span>상큼 톡톡</span>
          <img src={MojitoAndSideCar} />
          <p>ex) 모히토, 코스모 폴리탄, 사이드카, ...</p>
        </label>
        <label className={secondAnswer.includes(4) ? 'checked' : null} htmlFor='2-4'>
          <input
            type='checkbox'
            id='2-4'
            name='2'
            value={4}
            onChange={handleSecondAnswer}
            checked={secondAnswer.includes(4)}
          />
          <span>쌉싸름</span>
          <img src={BetweenTheSheetsAndNegroni} />
          <p>ex) 네그로니, 비트윈 더 시트, 캄파리 피즈, ...</p>
        </label>
        <label className={secondAnswer.includes(5) ? 'checked' : null} htmlFor='2-5'>
          <input
            type='checkbox'
            id='2-5'
            name='2'
            value={5}
            onChange={handleSecondAnswer}
            checked={secondAnswer.includes(5)}
          />
          <span>드라이</span>
          <img src={VodkaMartiniAndVesper} />
          <p>ex) 마티니, 베스퍼, 김렛, ...</p>
        </label>
        <label className={secondAnswer.includes(6) ? 'checked' : null} htmlFor='2-6'>
          <input type='checkbox' id='2-6' name='2' value={6} onChange={handleSecondAnswer} />
          <span>스트롱</span>
          <img src={DarkNStormyAndLongIslandIcedTea} />
          <p>ex) 롱티, 좀비, 다크 앤 스토미, ...</p>
        </label>
      </div>
      <p className='question'>당신이 선호하는 칵테일의 맛은 어떤 취향인가요?(2/2)</p>
      <div className='cocktailsGrid'>
        <label className={thirdAnswer.includes(1) ? 'checked' : null} htmlFor='3-1'>
          <input
            type='checkbox'
            id='3-1'
            name='3'
            value={1}
            onChange={handleThirdAnswer}
            checked={thirdAnswer.includes(1)}
          />
          <span>초콜릿 앤 크리미</span>
          <img src={AlexanderAndWhiteRussian} />
          <p>ex) 알렉산더, 그래스 호퍼, 화이트 러시안, ...</p>
        </label>
        <label className={thirdAnswer.includes(2) ? 'checked' : null} htmlFor='3-2'>
          <input
            type='checkbox'
            id='3-2'
            name='3'
            value={2}
            onChange={handleThirdAnswer}
            checked={thirdAnswer.includes(2)}
          />
          <span>청량감</span>
          <img src={MoscowMuleAndCaipirinha} />
          <p>ex) 모스코 뮬, 시브리즈, 카이피리냐, ...</p>
        </label>
        <label className={thirdAnswer.includes(3) ? 'checked' : null} htmlFor='3-3'>
          <input
            type='checkbox'
            id='3-3'
            name='3'
            value={3}
            onChange={handleThirdAnswer}
            checked={thirdAnswer.includes(3)}
          />
          <span>커피</span>
          <img src={EspressoMartiniAndIrishCoffee} />
          <p>ex) 블랙 러시안, 에스프레소 마티니, 아이리쉬 커피, ...</p>
        </label>
        <label className={thirdAnswer.includes(4) ? 'checked' : null} htmlFor='3-4'>
          <input
            type='checkbox'
            id='3-4'
            name='3'
            value={4}
            onChange={handleThirdAnswer}
            checked={thirdAnswer.includes(4)}
          />
          <span>트로피칼</span>
          <img src={BlueHawaiiAndPinaColada} />
          <p>ex) 블루 하와이, 허리케인, 피나콜라다, ...</p>
        </label>
        <label className={thirdAnswer.includes(5) ? 'checked' : null} htmlFor='3-5'>
          <input
            type='checkbox'
            id='3-5'
            name='3'
            value={5}
            onChange={handleThirdAnswer}
            checked={thirdAnswer.includes(5)}
          />
          <span>베리</span>
          <img src={SingaporeSlingAndKirRoyalAndStrawberryMargarita} />
          <p>ex) 싱가폴 슬링, 스트로베리 마가리타, 키르 로얄, ...</p>
        </label>
        <label className={thirdAnswer.includes(6) ? 'checked' : null} htmlFor='3-6'>
          <input type='checkbox' id='3-6' name='3' value={6} onChange={handleThirdAnswer} />
          <span>시트러스</span>
          <img src={ScrewDriverAndCampariOrange} />
          <p>ex) 스크류 드라이버, 캄파리 오렌지, 바카디, ...</p>
        </label>
      </div>
      <p className='question'>당신이 선호하는 기주가 있나요?</p>
      <label htmlFor='4-1'>
        <input
          type='checkbox'
          id='4-1'
          name='4'
          value={1}
          onChange={handleFourthAnswer}
          checked={fourthAnswer.includes(1)}
        />
        <span>위스키 베이스</span>
      </label>
      <label htmlFor='4-2'>
        <input
          type='checkbox'
          id='4-2'
          name='4'
          value={2}
          onChange={handleFourthAnswer}
          checked={fourthAnswer.includes(2)}
        />
        <span>보드카 베이스</span>
      </label>
      <label htmlFor='4-3'>
        <input
          type='checkbox'
          id='4-3'
          name='4'
          value={3}
          onChange={handleFourthAnswer}
          checked={fourthAnswer.includes(3)}
        />
        <span>진 베이스</span>
      </label>
      <label htmlFor='4-4'>
        <input
          type='checkbox'
          id='4-4'
          name='4'
          value={4}
          onChange={handleFourthAnswer}
          checked={fourthAnswer.includes(4)}
        />
        <span>럼 베이스</span>
      </label>
      <label htmlFor='4-5'>
        <input
          type='checkbox'
          id='4-5'
          name='4'
          value={5}
          onChange={handleFourthAnswer}
          checked={fourthAnswer.includes(5)}
        />
        <span>테킬라 베이스</span>
      </label>
      <label htmlFor='4-6'>
        <input
          type='checkbox'
          id='4-6'
          name='4'
          value={6}
          onChange={handleFourthAnswer}
          checked={fourthAnswer.includes(6)}
        />
        <span>브랜디, 와인, 샴페인 베이스</span>
      </label>
      <label htmlFor='4-7'>
        <input
          type='checkbox'
          id='4-7'
          name='4'
          value={7}
          onChange={handleFourthAnswer}
          checked={fourthAnswer.includes(7)}
        />
        <span>그런거 몰라요</span>
      </label>
      <p className='question'>주량은 어느정도 되세요?</p>
      <label htmlFor='5-1'>
        <input type='radio' id='5-1' name='5' value={1} onChange={(e) => setFifthAnswer(e.target.value)} />
        <span>소주 반 병 이하</span>
      </label>
      <label htmlFor='5-2'>
        <input type='radio' id='5-2' name='5' value={2} onChange={(e) => setFifthAnswer(e.target.value)} />
        <span>소주 한 병</span>
      </label>
      <label htmlFor='5-3'>
        <input type='radio' id='5-3' name='5' value={3} onChange={(e) => setFifthAnswer(e.target.value)} />
        <span>소주 한 병 ~ 두 병</span>
      </label>
      <label htmlFor='5-4'>
        <input type='radio' id='5-4' name='5' value={4} onChange={(e) => setFifthAnswer(e.target.value)} />
        <span>소주 두 병 ~ 세 병</span>
      </label>
      <label htmlFor='5-5'>
        <input type='radio' id='5-5' name='5' value={5} onChange={(e) => setFifthAnswer(e.target.value)} />
        <span>세 병 이상</span>
      </label>
      <br />
      <br />
      <button className='submitSurvey' type='submit'>
        제출
      </button>
    </form>
  );
};

export default Survey;
