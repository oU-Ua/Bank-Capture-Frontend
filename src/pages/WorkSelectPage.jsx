import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import {isRouteErrorResponse, useNavigate, useLocation,} from "react-router-dom";
import { API } from '../config';
import axios from 'axios';
import cover1 from "../assets/image/cover1.png";
import cover2 from "../assets/image/cover2.png";
import cover3 from "../assets/image/cover3.png";
import cover4 from "../assets/image/cover4.png";

function WorkSelectPage(props) {
    const location = useLocation();

    //고객 마이페이지에서 예약변경을 위해 넘어온 해당 은행ID값
    const bankId = location.state.bankId || "";
    //고객 마이페이지에서 예약변경을 위해 넘어온 해당 예약ID값
    const reservationId = location.state?.reservationId || "";

    // 은행업무
    const works = ["예금", "적금", "개인대출", "자산", "외환", "기업대출"];

    const [selectedWork, setSelectedWork] = useState("");

    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => {
        setIsHovered(true);
      };
    
      const handleMouseLeave = () => {
        setIsHovered(false);
      };

    const handleSelectedWork = (banker_task) => {
        setSelectedWork(banker_task);
    };

    const navigate = useNavigate();

    const moveToDetailSelect = () => {
        //여기서 axios 통신으로 백단에다 지점, 업무 ID 보내주고
        //백에서는 쿼리로 해당하는 행원 SELECT 후 RESPONSE로 해당하는 행원들 정보 반환.

        let taskId; //taskId 매핑을 위한 변수선언

        //각 업무에 맞는 taskId 매핑
        for (let i = 0; i < works.length; i++) {
            if (works[i] === selectedWork) {
                taskId = i + 1; // taskId는 1부터 시작하므로 +1
                break; //taskId를 찾으면 루프를 중단합니다.
            }
        }

        //지점, 업무에 해당하는 행원 조회를 위해 통신
        // axios
        //     .get(`${API.BANKER_INQUIRY}`, {
        //         params: {
        //             bankId: bankId,
        //             taskId: taskId,
        //         },
        //     })
        //     .then((response) => {
        //         navigate("/detail-select", {
        //             state: {
        //                 selectedBankers: response.data, //지점, 업무에 해당하는 행원들
        //                 taskId: taskId, //예약하기할때 taskId 필요해서 같이 넘겨줌
        //                 reservationId: reservationId, //예약변경일시 해당 예약ID 넘겨줌
        //                 selectedWork: selectedWork,
        //                 bankId: bankId,
        //             },
        //         });
        //     })
        //     .catch((error) => {
        //         console.error("조회 에러:", error);
        //     });


        
        navigate("/detail-select", {
            state: {
                taskId: taskId, //예약하기할때 taskId 필요해서 같이 넘겨줌
                reservationId: reservationId, //예약변경일시 해당 예약ID 넘겨줌
                selectedWork: selectedWork,
                bankId: bankId,
            },
        });

    };

    const moveToReservation = () => {
        navigate("/reservation");
    };

    return (
        <Container>
            <SubContainer>
                <Intro>어떤 업무를 처리하시겠습니까?</Intro>
                <WorkContainer>
                    {works.map((banker_task, index) => (
                        <WorkBox
                            key={index}
                            onClick={() => handleSelectedWork(banker_task)}
                            isSelected={selectedWork === banker_task}

                            onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      isHovered={isHovered}
                        >
                            {banker_task}
                        </WorkBox>
                    ))}
                </WorkContainer>

                <CancelBtn onClick={moveToReservation}>취소</CancelBtn>
                <SelectBtn onClick={moveToDetailSelect}>확인</SelectBtn>
            </SubContainer>
        </Container>
    );
}

const SubContainer = styled.div`
    flex-grow: 1;
    text-align: center;

    padding-top: 70px;

`;

const Container = styled.div`
padding-left: 200px;
    padding-right: 200px;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 120px);
    /* background-color: black; */
`;

const Intro = styled.div`
    font-size: 45px;
    font-weight: 900;
    margin-bottom: 60px;
    /* color: white; */
`;

const WorkContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    column-gap: 40px;
    row-gap: 30px;
    padding: 50px;
`;

const WorkBox = styled.div`
    font-size: 45px;
    border: 5px solid ${(props) => (props.isSelected ? '#F2B418' : '#d8d8d8')};
    background-color: ${(props) => (props.isSelected ? '#F2B418' : 'white')};
    color: ${(props) => (props.isSelected ? 'black' : 'black')};
    font-weight:  ${(props) => (props.isSelected ? '700' : '500')};;
    border-radius: 20px;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.1s;

    &:hover { // 호버 시 배경색 변경
        border: 5px solid #F2B418;
    }
`;

const CancelBtn = styled.button`
    width: 150px;
    padding-top: 20px;
    padding-bottom: 20px;
    font-size: 25px;
    font-weight: 700;
    cursor: pointer;
    color: black;
    background-color: white;
    border: 3px solid black;
    border-radius: 10px;
    margin-right: 20px;
    margin-top: 50px;
`;

const SelectBtn = styled.button`
    width: 150px;
    padding-top: 20px;
    padding-bottom: 20px;
    font-size: 25px;
    font-weight: 900;
    color: white;
    cursor: pointer;
    background-color: black;
    border: 2px solid black;
    border-radius: 10px;
    margin-top: 50px;
`;

export default WorkSelectPage;