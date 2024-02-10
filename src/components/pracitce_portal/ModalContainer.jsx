"use client";
import React, { useState } from "react";
import NoPortalModal from "@/components/pracitce_portal/NoPortalModal";
import PortalModal from "@/components/pracitce_portal/PortalModal";

/**
 * 부모의 zIndex 가 1
 * 자식의 zIndex 가 2
 * 모달의 zIndex 가 아무리 높다 한들, Z Index 2 를 포함하는 자식은 NoPortalModal 에 덮이지 않고 부모 위로 보여진다.
 * 이런 문제를 해결해주느 것이 포탈
 */
const modalWrapperStyle = {
  position: "relative",
  zIndex: 1,
};

const higherIndexWrapperStyle = {
  position: "relative",
  zIndex: 2,
  backgroundColor: "blue",
  padding: "2rem",
};

const ModalContent = () => {
  return (
    <>
      <p>모달에 들어갈 내용</p>
      <p>HELLO</p>
    </>
  );
};
const ModalContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div>
      <div
        onClick={() => console.log("부모 PortalContainer 클릭")}
        style={modalWrapperStyle}
      >
        <button onClick={openModal}>모달 열기</button>

        {/*  Portal 이 없는 일반 모달  */}
        {/*<NoPortalModal open={isModalOpen} onClosed={closeModal}>*/}
        {/*  <ModalContent />*/}
        {/*</NoPortalModal>*/}

        <PortalModal open={isModalOpen} onClosed={closeModal}>
          <ModalContent />
        </PortalModal>
      </div>

      <div style={higherIndexWrapperStyle}>Z INDEX 2</div>
    </div>
  );
};

export default ModalContainer;
