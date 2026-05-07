"use client";

import React from "react";
import ContactUs from "../components/contactus";

export default function ContactPage() {
  return (
    <div className="bg-background text-foreground min-h-screen w-screen overflow-y-auto overflow-x-hidden scrollbar-hide relative transition-colors duration-700">
      <ContactUs />
    </div>
  );
}
