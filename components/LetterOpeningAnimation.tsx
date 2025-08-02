"use client";
import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

// Envelope and Letter Styles
const EnvelopeWrap = styled.div`
  width: 320px;
  max-width: 95vw;
  margin: 32px auto;
  position: relative;
  user-select: none;
`;

const Envelope = styled.div`
  width: 100%;
  aspect-ratio: 1.2 / 1;
  background: #bdbdbd;
  border-radius: 18px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 3px 16px #0002, 0 0 0 6px #fff;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0; right: 0;
    height: 70%;
    background: #ababab;
    border-bottom-left-radius: 18px;
    border-bottom-right-radius: 18px;
    z-index: 2;
  }
`;

const Flap = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 54%;
  background: #faf9f6;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  clip-path: polygon(50% 0, 100% 100%, 0% 100%);
  z-index: 3;
`;

const HeartSeal = styled.div`
  position: absolute;
  left: 50%; bottom: 32px;
  transform: translateX(-50%);
  z-index: 4;
  font-size: 1.7em;
  color: #757575;
  background: #faf9f6;
  width: 36px; height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center; justify-content: center;
  box-shadow: 0 0 0 3px #fff;
`;

const letterSlide = keyframes`
  from { transform: translateY(70%); }
  to   { transform: translateY(0%); }
`;

const Letter = styled.div<{ open: boolean }>`
  width: 88%;
  min-height: 120px;
  background: #fff9ee;
  border-radius: 12px 12px 8px 8px;
  box-shadow: 0 6px 20px #0001;
  position: absolute;
  left: 6%; bottom: 18%;
  z-index: 7;
  overflow: hidden;
  border: 2px solid #f6e9c7;
  padding: 0;

  /* Hide letter in envelope, reveal on open */
  transform: translateY(${props => props.open ? '0%' : '70%'});
  transition: transform 0.9s cubic-bezier(.7,1.5,.2,1);
  animation: ${props => props.open ? letterSlide : 'none'} 0.95s cubic-bezier(.7,1.5,.2,1);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const LetterContent = styled.div`
  padding: 24px 16px;
  font-family: 'Courier New', monospace;
  font-size: 1.18em;
  color: #59504c;
  text-align: center;

  @media (max-width: 400px) {
    font-size: 1em;
    padding: 18px 3vw;
  }
`;

const QuranRef = styled.div`
  padding-bottom: 12px;
  color: #888;
  font-size: 0.98em;
  letter-spacing: 1.2px;
  font-family: 'Poppins', Arial, sans-serif;
`;


export default function LetterOpeningAnimation() {
  const [open, setOpen] = useState(false);

  return (
    <EnvelopeWrap>
      <Envelope onClick={() => setOpen(open => !open)} style={{cursor: "pointer"}}>
        <Flap />
        <HeartSeal>❤️</HeartSeal>
        <Letter open={open}>
          <LetterContent>
            <div>
              <b>Indeed, with every difficulty, there is relief.</b>
              <br/><br/>
              <QuranRef>Quran 94:6</QuranRef>
            </div>
          </LetterContent>
        </Letter>
      </Envelope>
      <div style={{textAlign:"center", marginTop:12, opacity:0.65,fontSize:'1.01em'}}>
        {open ? "Click the envelope to close" : "Click to open the letter"}
      </div>
    </EnvelopeWrap>
  );
}