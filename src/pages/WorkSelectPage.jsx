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
    //지도 구현하면 bankId useState로 관리해야함
    const bankId = 1;
    const location = useLocation();

    //고객 마이페이지에서 예약변경을 위해 넘어온 해당 예약ID값
    const reservationId = location.state?.reservationId || "";
    
    // 은행원 더미데이터
    // const bankerAll = [
    //     {
    //       id: 1,
    //       banker_imgepath: cover1,
    //       banker_name: '신동렬',
    //       banker_career: '3년',
    //       banker_task: ['투자', '예금', '적금'],
    //       banker_avg_star: 4.9,
    //       banker_cnt_comment: 2,
    //       banker_info: '감사합니다. 잘 부탁드립니다~',
    //       schedule_list:[
    //         {
    //                 date: "2023-09-11",
    //                 time: ['9:00','10:00','11:00']
    //                 },
    //                 {
    //                 date: "2023-09-13",
    //                 time: ['9:00','10:00','14:00']
    //                 }
    //            ],
    //     },
    //     {
    //       id: 2,
    //       banker_imgepath: cover2,
    //       banker_name: '송봉섭',
    //       banker_career: '2년',
    //       banker_task: ['투자', '기업대출', '예금', '적금'],
    //       banker_avg_star: 4.0,
    //       banker_cnt_comment: 2,
    //       banker_info: '한줄소개입니다',
    //       schedule_list:[
    //         {
    //                 date: "2023-09-11",
    //                 time: ['9:00','10:00','11:00','14:00']
    //                 },
    //                 {
    //                 date: "2023-09-13",
    //                 time: ['10:00','11:00','14:00'],
    //                 }
    //            ],

    //     },
    //     {
    //       id: 3,
    //       banker_imgepath: cover3,
    //       banker_name: '전민형',
    //       banker_career: '2년',
    //       banker_task: ['개인대출', '기업대출'],
    //       banker_avg_star: 4.9,
    //       banker_cnt_comment: 0,
    //       banker_info: '잘 부탁드립니다다당',
    //       schedule_list:[
    //         {
    //                 date: "2023-09-12",
    //                 time: ['10:00','11:00','14:00'],
    //                 },
    //                 {
    //                 date: "2023-09-13",
    //                 time: ['10:00','11:00']
    //                 }
    //            ],
    //     },
    //     {
    //         id: 4,
    //         banker_imgepath: cover4,
    //         banker_name: '오원식',
    //         banker_career: '3년',
    //         banker_task: ['자산', '적금'],
    //         banker_avg_star: 3.7,
    //         banker_cnt_comment: 4,
    //         banker_info: '감사합니다. 잘 부탁드립니다!',
    //         schedule_list:[
    //             {
    //                     date: "2023-09-11",
    //                     time: ['11:00']
    //                     },
    //                     {
    //                     date: "2023-09-13",
    //                     time: ['10:00','11:00','14:00']
    //                     },
    //                     {
    //                         date: "2023-09-15",
    //                         time: ['10:00','14:00','15:00','16:00']
    //                         }
    //                ],
    //       },
    //        {
    //         id: 5,
    //         banker_imgepath: cover4,
    //         banker_name: '오원식',
    //         banker_career: '3년',
    //         banker_task: ['자산', '적금'],
    //         banker_avg_star: 3.7,
    //         banker_cnt_comment: 4,
    //         banker_info: '감사합니다. 잘 부탁드립니다!',
    //         schedule_list:[
    //                     {
    //                     date: "2023-09-13",
    //                     time: ['14:00','15:00','16:00']
    //                     },
    //                     {
    //                         date: "2023-09-15",
    //                         time: ['10:00','11:00','13:00','16:00']
    //                         }
    //                ],
    //       },
    //        {
    //         id: 6,
    //         banker_imgepath: cover4,
    //         banker_name: '오원식',
    //         banker_career: '3년',
    //         banker_task: ['자산', '적금'],
    //         banker_avg_star: 3.7,
    //         banker_cnt_comment: 4,
    //         banker_info: '감사합니다. 잘 부탁드립니다!',
    //         schedule_list:[
    //             {
    //             date: "2023-09-14",
    //             time: ['10:00','13:00','16:00']
    //             },
    //             {
    //                 date: "2023-09-15",
    //                 time: ['13:00','16:00']
    //                 }
    //        ],
    //       },
    //        {
    //         id: 7,
    //         banker_imgepath: cover4,
    //         banker_name: '오원식',
    //         banker_career: '3년',
    //         banker_task: ['자산', '적금'],
    //         banker_avg_star: 3.7,
    //         banker_cnt_comment: 4,
    //         banker_info: '감사합니다. 잘 부탁드립니다!',
    //         schedule_list:[
    //             {
    //             date: "2023-09-14",
    //             time: ['13:00','16:00']
    //             },
    //             {
    //                 date: "2023-09-15",
    //                 time: ['10:00','13:00','16:00']
    //                 },
    //                 {
    //                     date: "2023-09-16",
    //                     time: ['10:00','13:00','14:00']
    //                     }

    //        ],
    //       },
    //        {
    //         id: 8,
    //         banker_imgepath: cover4,
    //         banker_name: '오원식',
    //         banker_career: '3년',
    //         banker_task: ['자산', '적금'],
    //         banker_avg_star: 3.7,
    //         banker_cnt_comment: 4,
    //         banker_info: '감사합니다. 잘 부탁드립니다!',
    //         schedule_list:[
    //             {
    //             date: "2023-09-14",
    //             time: ['10:00','13:00']
    //             },
    //             {
    //                 date: "2023-09-15",
    //                 time: ['10:00']
    //                 },
    //                 {
    //                     date: "2023-09-17",
    //                     time: ['11:00','13:00','15:00']
    //                     }

    //        ],
    //       },

    // ];

    // 은행업무
    const works = ["예금", "적금", "개인대출", "자산", "외환", "기업대출"];

    const [selectedWork, setSelectedWork] = useState("");

    const handleSelectedWork = (banker_task) => {
        setSelectedWork(banker_task);
    };

    const navigate = useNavigate();

    // const [selectedBankers, setSelectedBankers] = useState([]);

    // const moveToDetailSelect = () => {
    //     //여기서 axios 통신으로 백단에다 지점, 업무 ID 보내주고
    //     //백에서는 쿼리로 해당하는 행원 SELECT 후 RESPONSE로 해당하는 행원들 정보 반환.
    //     if (selectedWork) {
    //         // 선택한 업무와 일치하는 은행원 정보 필터링
    //         const selectedBankers = bankerAll.filter(banker =>
    //             banker.banker_task.includes(selectedWork)
    //         );
    //         // console.log(selectedEmployees);

    //         // DetailSelectPage로 필터링된 정보를 전달
    //         navigate('/detail-select', { state: { selectedBankers } });
    //     }
    // }

    // useEffect(() => {
    //         axios
    //       .post(`${API.BANKER_INQUIRY}`, {
    //         "bankId": bankId,
    //         "taskId": selectedWork
    //       })
    //       .then((response) => {
    //         console.log("조회 성공:", response.data);
    //         setSelectedBankers(response.data)
    //       })
    //       .catch((error) => {
    //         console.error("조회 에러:", error);
    //       });

    // }, []);

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
        axios
            .get(`${API.BANKER_INQUIRY}`, {
                params: {
                    bankId: bankId,
                    taskId: taskId,
                },
            })
            .then((response) => {
                navigate("/detail-select", {
                    state: {
                        selectedBankers: response.data, //지점, 업무에 해당하는 행원들
                        taskId, //예약하기할때 taskId 필요해서 같이 넘겨줌
                        reservationId //예약변경일시 해당 예약ID 넘겨줌
                    },
                });
            })
            .catch((error) => {
                console.error("조회 에러:", error);
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
margin-left: 200px;
    margin-right: 200px;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 120px);
`;

const Intro = styled.div`
    font-size: 45px;
    font-weight: 700;
    margin-bottom: 60px;
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
    border: 2px solid black;
    background-color: ${(props) => (props.isSelected ? 'black' : 'white')};;
    color: ${(props) => (props.isSelected ? 'white' : 'black')};
    border-radius: 20px;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const CancelBtn = styled.button`
    width: 200px;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 25px;
    font-weight: 700;
    cursor: pointer;
    background-color: white;
    border: 2px solid black;
    border-radius: 10px;
    margin-right: 20px;
    margin-top: 50px;
`;

const SelectBtn = styled.button`
    width: 200px;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 25px;
    font-weight: 700;
    color: white;
    cursor: pointer;
    background-color: black;
    border: 2px solid black;
    border-radius: 10px;
    margin-top: 50px;
`;

export default WorkSelectPage;