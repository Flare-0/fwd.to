"use client";
import React from 'react';
import Link from 'next/link';
import "./header.css"
export default function Header() {
  return (
    <div className="container">
      <Link href="/">
        <img className="headerImg" src="https://raw.githubusercontent.com/Flare-0/fwd.to/main/public/fwdto.svg" alt="Fwd.to" />
      </Link>

      <div className="navLink">
        <div className="navLinkItem">
          <Link href="/">
            <p className="navlinkP">Home</p>
          </Link>
        </div>
        <div className="navLinkItem">
          <Link href="/tr">
            <p className="navlinkP">Track</p>
          </Link>
        </div>
        <div className="navLinkItem">
          <Link href="/how-to-use">
            <p className="navlinkP">How to use?</p>
          </Link>
        </div>
        <div className="navLinkItem">
          <Link href="https://github.com/Flare-0/fwd.to">
            <p className="navlinkP">Info</p>
          </Link>
        </div>

      </div>
    </div>
  );
}
