'use client';

import TextComponent from '@/components/Text';
import { BoxIcon, CodeIcon, DatabaseBackupIcon, DownloadIcon, LetterTextIcon, MapIcon, NfcIcon } from 'lucide-react';

export default function DevelopmentPage() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="grid grid-cols-3 gap-6 w-full lg:w-1/2">
        <div className="flex flex-col items-center space-y-2">
          <div className="p-2 border-1 border-blue-hris rounded-lg">
            <BoxIcon className="dark:text-light text-dark w-8 h-8" />
          </div>
          <TextComponent>Preference</TextComponent>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="p-2 border-1 border-blue-hris rounded-lg">
            <CodeIcon className="dark:text-light text-dark w-8 h-8" />
          </div>
          <TextComponent>API</TextComponent>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="p-2 border-1 border-blue-hris rounded-lg">
            <DatabaseBackupIcon className="dark:text-light text-dark w-8 h-8" />
          </div>
          <TextComponent>Integration</TextComponent>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="p-2 border-1 border-blue-hris rounded-lg">
            <DownloadIcon className="dark:text-light text-dark w-8 h-8" />
          </div>
          <TextComponent>Update</TextComponent>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="p-2 border-1 border-blue-hris rounded-lg">
            <NfcIcon className="dark:text-light text-dark w-8 h-8" />
          </div>
          <TextComponent>Hook</TextComponent>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="p-2 border-1 border-blue-hris rounded-lg">
            <MapIcon className="dark:text-light text-dark w-8 h-8" />
          </div>
          <TextComponent>Guide</TextComponent>
        </div>
      </div>
    </div>
  );
}
