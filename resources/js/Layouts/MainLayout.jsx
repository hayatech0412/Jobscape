import React, { createContext, useState, useContext, useRef, useEffect } from 'react';
import { usePage } from "@inertiajs/react";
import { Toast } from 'primereact/toast';
import "primereact/resources/themes/lara-light-cyan/theme.css";

export const MainLayout = ({ children }) => {
  const toast = useRef(null);
  const { flash } = usePage().props;

  useEffect(() => {
    if (flash.success) {
      toast.current.show({ 
        severity: 'success', 
        summary: '成功', 
        detail: flash.success
      });
    }
    if (flash.error) {
      toast.current.show({ 
        severity: 'error', 
        summary: 'エラー', 
        detail: flash.error
      });
    }
  }, [flash]);

  return (
    <div>
      {children}

      <Toast ref={toast} />
    </div>
  );
};