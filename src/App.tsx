/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { SiteHeader } from './components/SiteHeader';
import { sound } from './utils/sound';

const RobotTouchSection = React.lazy(() =>
  import('./components/RobotTouchSection').then((m) => ({
    default: m.RobotTouchSection,
  }))
);

const CLOUDINARY_OPT = 'https://res.cloudinary.com/trangsoidamtruong/image/upload/f_auto,q_auto';
const CLOUDINARY_RAW = 'https://res.cloudinary.com/trangsoidamtruong/image/upload';

const ASSETS = {
  wall: {
    remote: `${CLOUDINARY_OPT}/v1794205543/Glitchtopia-wall.webp`,
    rawRemote: `${CLOUDINARY_RAW}/v1794205543/Glitchtopia-wall.webp`,
    local: '/assets/aistudio/Glitchtopia-wall.webp',
  },
  logo: {
    remote: `${CLOUDINARY_OPT}/v1794206661/Glitchtopia_logo.png`,
    rawRemote: `${CLOUDINARY_RAW}/v1794206661/Glitchtopia_logo.png`,
    local: '/assets/aistudio/Glitchtopia_logo.png',
  },
  memoryTerminal: {
    remote: `${CLOUDINARY_OPT}/v1794206700/MemoryTerminal-button.png`,
    rawRemote: `${CLOUDINARY_RAW}/v1794206700/MemoryTerminal-button.png`,
    local: '/assets/aistudio/MemoryTerminal-button.png',
  },
  defenseIntercept: {
    remote: `${CLOUDINARY_OPT}/v1794205545/DefenseIntercept-button.png`,
    rawRemote: `${CLOUDINARY_RAW}/v1794205545/DefenseIntercept-button.png`,
    local: '/assets/aistudio/DefenseIntercept-button.png',
  },
  careLog: {
    remote: `${CLOUDINARY_OPT}/v1794205545/CareLog-button.png`,
    rawRemote: `${CLOUDINARY_RAW}/v1794205545/CareLog-button.png`,
    local: '/assets/aistudio/CareLog-button.png',
  },
  restoreClinic: {
    remote: `${CLOUDINARY_OPT}/v1794205547/RestoreClinic-button.png`,
    rawRemote: `${CLOUDINARY_RAW}/v1794205547/RestoreClinic-button.png`,
    local: '/assets/aistudio/RestoreClinic-button.png',
  },
  memoryWall: {
    remote: `${CLOUDINARY_OPT}/v1794205542/MemoryTerminal-wall.webp`,
    rawRemote: `${CLOUDINARY_RAW}/v1794205542/MemoryTerminal-wall.webp`,
    local: '/assets/aistudio/MemoryTerminal-wall.webp',
  },
  careLogWall: {
    remote: `${CLOUDINARY_OPT}/v1794358870/carelog-wall.webp`,
    rawRemote: `${CLOUDINARY_RAW}/v1794358870/carelog-wall.webp`,
    local: '/assets/aistudio/carelog-wall.webp',
  },
  restoreClinicWall: {
    remote: `${CLOUDINARY_OPT}/v1794205543/RestoreClinic-wall.webp`,
    rawRemote: `${CLOUDINARY_RAW}/v1794205543/RestoreClinic-wall.webp`,
    local: '/assets/aistudio/RestoreClinic-wall.webp',
  },
  scanButton: {
    // Keep animated WebP original URL untouched so all animation frames play smoothly
    remote: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794359973/scan-button.webp',
    rawRemote: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794359973/scan-button.webp',
    local: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794359973/scan-button.webp',
  },
  chibiCare: {
    // Keep animated WebP original URL untouched so all animation frames play smoothly
    remote: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794364780/chibi-care.webp',
    rawRemote: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794364780/chibi-care.webp',
    local: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794364780/chibi-care.webp',
  },
  chibiEyeBattery: {
    // Keep animated WebP original URL untouched so all animation frames play smoothly
    remote: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794386034/chibi1-eyebattery.webp',
    rawRemote: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794386034/chibi1-eyebattery.webp',
    local: '/assets/aistudio/chibi1-eyebattery.webp',
  },
  chibiEye: {
    // Keep animated WebP original URL untouched so all animation frames play smoothly
    remote: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794386034/chibi1-eye.webp',
    rawRemote: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794386034/chibi1-eye.webp',
    local: '/assets/aistudio/chibi1-eye.webp',
  },
  chibiScan: {
    // Keep animated WebP original URL untouched so all animation frames play smoothly
    remote: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794452562/chibi-scan.webp',
    rawRemote: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794452562/chibi-scan.webp',
    local: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794452562/chibi-scan.webp',
  },
  chibiScan2: {
    // Keep animated WebP original URL untouched so all animation frames play smoothly
    remote: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794494141/chibi-scan2.webp',
    rawRemote: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794494141/chibi-scan2.webp',
    local: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794494141/chibi-scan2.webp',
  },
  chibiBattery: {
    // Keep animated WebP original URL untouched so all animation frames play smoothly
    remote: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794386035/chibi1-battery.webp',
    rawRemote: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794386035/chibi1-battery.webp',
    local: '/assets/aistudio/chibi1-battery.webp',
  },
  chibiStarTorn: {
    // Keep animated WebP original URL untouched so all animation frames play smoothly
    remote: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794395358/chibi2-startorn.webp',
    rawRemote: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794395358/chibi2-startorn.webp',
    local: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794395358/chibi2-startorn.webp',
  },
  chibiPlantPatch: {
    // Keep animated WebP original URL untouched so all animation frames play smoothly
    remote: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794443153/chibi3-plantpatch.webp',
    rawRemote: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794443153/chibi3-plantpatch.webp',
    local: '/assets/aistudio/chibi3-plantpatch.webp',
  },
  chibiPlant: {
    // Keep animated WebP original URL untouched so all animation frames play smoothly
    remote: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794443153/chibi3-plant.webp',
    rawRemote: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794443153/chibi3-plant.webp',
    local: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794443153/chibi3-plant.webp',
  },
  chibiPatch: {
    // Keep animated WebP original URL untouched so all animation frames play smoothly
    remote: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794443152/chibi3-patch.webp',
    rawRemote: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794443152/chibi3-patch.webp',
    local: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794443152/chibi3-patch.webp',
  },
  scanning: {
    remote: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794359972/scanning.webp',
    rawRemote: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794359972/scanning.webp',
    local: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794359972/scanning.webp',
  },
  chibiIdle: {
    // Keep animated WebP original URL untouched so all animation frames play smoothly
    remote: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794214486/chibi-idle.webp',
    rawRemote: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794214486/chibi-idle.webp',
    local: '/assets/aistudio/chibi-idle.webp',
  },
  chibiHappy: {
    // Keep animated WebP original URL untouched so all animation frames play smoothly
    remote: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794227454/chibi-happy.webp',
    rawRemote: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794227454/chibi-happy.webp',
    local: '/assets/aistudio/chibi-happy.webp',
  },
  chibiPuzzled: {
    // Keep animated WebP original URL untouched so all animation frames play smoothly
    remote: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794548197/chibi-puzzled.webp',
    rawRemote: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794548197/chibi-puzzled.webp',
    local: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794548197/chibi-puzzled.webp',
  },
  chibiQuestion: {
    // Keep animated WebP original URL untouched so all animation frames play smoothly
    remote: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794538025/chibi-question.webp',
    rawRemote: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794538025/chibi-question.webp',
    local: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794538025/chibi-question.webp',
  },
  computer0: {
    remote: `${CLOUDINARY_OPT}/v1794222624/computer-0.webp`,
    rawRemote: `${CLOUDINARY_RAW}/v1794222624/computer-0.webp`,
    local: '/assets/aistudio/computer-0.webp',
  },
  computer1: {
    remote: `${CLOUDINARY_OPT}/v1794223983/computer-1.webp`,
    rawRemote: `${CLOUDINARY_RAW}/v1794223983/computer-1.webp`,
    local: '/assets/aistudio/computer-1.webp',
  },
  computer2: {
    remote: `${CLOUDINARY_OPT}/v1794223985/computer-2.webp`,
    rawRemote: `${CLOUDINARY_RAW}/v1794223985/computer-2.webp`,
    local: '/assets/aistudio/computer-2.webp',
  },
  plant: {
    remote: `${CLOUDINARY_OPT}/v1794353564/plant.webp`,
    rawRemote: `${CLOUDINARY_RAW}/v1794353564/plant.webp`,
    local: '/assets/aistudio/plant.webp',
  },
  robot: {
    remote: `${CLOUDINARY_OPT}/v1794405306/robot.webp`,
    rawRemote: `${CLOUDINARY_RAW}/v1794405306/robot.webp`,
    local: '/assets/aistudio/robot.webp',
  },
};

// Delicately sized micro bubbles synced to the 2780ms chibi-question cycle so bubbles return right as speech ends
const ROBOT_BURST_BUBBLES = [
  // Upper cluster (rising gently upward toward window arch)
  { id: 1, dx: 38, dy: -55, size: 15, delay: 0, dur: 2.15 },
  { id: 2, dx: 72, dy: -80, size: 8, delay: 50, dur: 2.3 },
  { id: 3, dx: 98, dy: -110, size: 11, delay: 90, dur: 2.35 },
  { id: 4, dx: 125, dy: -95, size: 20, delay: 30, dur: 2.5 },
  { id: 5, dx: 150, dy: -125, size: 10, delay: 120, dur: 2.45 },
  { id: 6, dx: 58, dy: -32, size: 7, delay: 20, dur: 2.1 },
  { id: 7, dx: -28, dy: -38, size: 10, delay: 10, dur: 2.0 },
  // Rightward cluster (drifting into window center)
  { id: 8, dx: 85, dy: -10, size: 9, delay: 60, dur: 2.25 },
  { id: 9, dx: 115, dy: 12, size: 16, delay: 40, dur: 2.4 },
  { id: 10, dx: 148, dy: -24, size: 8, delay: 100, dur: 2.35 },
  { id: 11, dx: 175, dy: 28, size: 13, delay: 80, dur: 2.55 },
  { id: 12, dx: 215, dy: -38, size: 10, delay: 150, dur: 2.6 },
  { id: 13, dx: 245, dy: 50, size: 12, delay: 120, dur: 2.65 },
  // Lower cluster (drifting downward toward chibi head and room)
  { id: 14, dx: 50, dy: 50, size: 9, delay: 40, dur: 2.15 },
  { id: 15, dx: 78, dy: 78, size: 14, delay: 80, dur: 2.35 },
  { id: 16, dx: 105, dy: 110, size: 8, delay: 110, dur: 2.45 },
  { id: 17, dx: -35, dy: 38, size: 9, delay: 20, dur: 2.1 },
  { id: 18, dx: -15, dy: 80, size: 7, delay: 60, dur: 2.1 },
  { id: 19, dx: 32, dy: 118, size: 8, delay: 90, dur: 2.3 },
  { id: 20, dx: 135, dy: 65, size: 11, delay: 70, dur: 2.35 },
  { id: 21, dx: 185, dy: 92, size: 7, delay: 130, dur: 2.55 },
  { id: 22, dx: 158, dy: -62, size: 8, delay: 110, dur: 2.45 },
  { id: 23, dx: 45, dy: -85, size: 6, delay: 80, dur: 2.25 },
  { id: 24, dx: 135, dy: -140, size: 7, delay: 140, dur: 2.5 },
  { id: 25, dx: 195, dy: -8, size: 9, delay: 110, dur: 2.5 },
];

const COMPUTER_SKINS = [ASSETS.computer0, ASSETS.computer1, ASSETS.computer2];

// ============================================================================
// NỘI DUNG BẢNG DIAGNOSTIC CHECKLIST LOG - 1, LOG - 2 & LOG - 3 (Dễ dàng chỉnh sửa chữ tại đây)
// ============================================================================
const DIAGNOSTIC_CHECKLIST_TEXT = {
  title: 'Diagnostic Checklist',
  subtitle: 'DIAGNOSIS   REPORT',
  items: [
    {
      id: 'eyelid',
      iconType: 'face' as const,
      lines: ['Circuitry visible below', 'the lower eyelid.'],
    },
    {
      id: 'battery',
      iconType: 'body' as const,
      lines: ['Warning! Battery level is', 'low.'],
    },
  ],
};

const DIAGNOSTIC_CHECKLIST_LOG2_TEXT = {
  title: 'Diagnostic Checklist',
  subtitle: 'DIAGNOSIS   REPORT',
  items: [
    {
      id: 'gyroscope',
      iconType: 'brain' as const,
      lines: ['Gyroscope failure.', 'Sudden dizziness.'],
    },
    {
      id: 'torso',
      iconType: 'body' as const,
      lines: ['Torn clothes have', 'exposed the torso.'],
    },
  ],
};

const DIAGNOSTIC_CHECKLIST_LOG3_TEXT = {
  title: 'Diagnostic Checklist',
  subtitle: 'DIAGNOSIS   REPORT',
  items: [
    {
      id: 'eyepatch',
      iconType: 'face' as const,
      lines: ['Damaged sensor. Using', 'an eyepatch.'],
    },
    {
      id: 'plants',
      iconType: 'brain' as const,
      lines: ['Plants are sprouting in', 'his hair.'],
    },
  ],
};

const DIAGNOSTIC_CHECKLIST_LOG4_TEXT = {
  title: 'Diagnostic Checklist',
  subtitle: 'DIAGNOSIS   REPORT',
  items: [
    {
      id: 'vision',
      iconType: 'face' as const,
      lines: ['Optical interference.', 'Seeing double or triple.'],
    },
    {
      id: 'battery',
      iconType: 'body' as const,
      lines: ['Warning! Battery level is', 'low.'],
    },
  ],
};

const DIAGNOSTIC_CHECKLIST_LOG5_TEXT = {
  title: 'Diagnostic Checklist',
  subtitle: 'DIAGNOSIS   REPORT',
  items: [
    {
      id: 'sprout',
      iconType: 'brain' as const,
      lines: ['Photosynthesis add-on', 'sprouting in his hair.'],
    },
    {
      id: 'circuits',
      iconType: 'face' as const,
      lines: ['Circuitry visible below', 'the lower eyelid.'],
    },
  ],
};

// ============================================================================
// THOẠI CỐ ĐỊNH CHUNG CHO MỌI LOG TRONG RESTORE CLINIC
// ============================================================================
interface ClinicDialogueLine {
  speaker: 'MC' | 'X';
  lines: readonly string[];
}

interface MaintenanceStep1Config {
  prompt: string;
  choices: readonly [string, string];
  afterScanQuotes: {
    choice0: readonly string[];
    choice1: readonly string[];
  };
}

interface MaintenanceStep2Config {
  prompt: string;
  choices: readonly [string, string];
  afterScanQuotes: {
    choice0: readonly string[];
    choice1: readonly string[];
  };
  postCompleteDialogue: {
    choice0_0: readonly ClinicDialogueLine[];
    choice0_1: readonly ClinicDialogueLine[];
    choice1_0: readonly ClinicDialogueLine[];
    choice1_1: readonly ClinicDialogueLine[];
  };
}

const FIXED_CLINIC_DIALOGUE = {
  afterInitialScanX: [
    'System error. I need',
    'some time for repairs.',
  ] as const,
  afterInitialScanMC: [
    'Then let me switch to',
    'caretaker mode.',
  ] as const,
  completeBannerText: 'Complete!',
  completeQuoteLines: [
    'Fixed. Now I can rest',
    'with a full battery.',
  ] as const,
  tapToContinueText: 'Tap to continue',
};

// ============================================================================
// NỘI DUNG CÁC BƯỚC SỬA CHỮA & ĐỐI THOẠI CHO LOG - 1 ĐẾN LOG - 5
// ============================================================================
const DEFAULT_URGENT_DIALOGUE: readonly ClinicDialogueLine[] = [
  {
    speaker: 'MC',
    lines: ['You remind me of a', 'nightmare I had.'],
  },
  {
    speaker: 'MC',
    lines: ['In it, you became a', 'super alien.'],
  },
  {
    speaker: 'MC',
    lines: ['Your eyes shot lasers and', 'ended everything!'],
  },
  {
    speaker: 'X',
    lines: ['...My eyes will be closed', 'for our dates from now on?'],
  },
  {
    speaker: 'MC',
    lines: ['Why is the end of the world', 'insane in my dreams?'],
  },
  {
    speaker: 'X',
    lines: ['Ending the world requires', 'effort. Keep it simple.'],
  },
  {
    speaker: 'MC',
    lines: ['Leaning on me is your easy', 'way to recharge?'],
  },
  {
    speaker: 'X',
    lines: ["Yes. I'm almost fully", 'charged.'],
  },
  {
    speaker: 'X',
    lines: ["Now I'll be a little bad with", 'the one closet to me.'],
  },
];

const DEFAULT_LOW_POWER_DIALOGUE: readonly ClinicDialogueLine[] = [
  {
    speaker: 'MC',
    lines: ['You remind me of a', 'nightmare I had.'],
  },
  {
    speaker: 'MC',
    lines: ['In it, you became a', 'super alien.'],
  },
  {
    speaker: 'MC',
    lines: ['Your eyes shot lasers and', 'ended everything!'],
  },
  {
    speaker: 'X',
    lines: ['...My eyes will be closed', 'for our dates from now on?'],
  },
  {
    speaker: 'MC',
    lines: ['Why is the end of the world', 'insane in my dreams?'],
  },
  {
    speaker: 'X',
    lines: ['Ending the world requires', 'effort. Keep it simple.'],
  },
  {
    speaker: 'MC',
    lines: ['Leaning on me is your easy', 'way to recharge?'],
  },
  {
    speaker: 'X',
    lines: ["I'm already doing what I", 'want the most.'],
  },
  {
    speaker: 'X',
    lines: ['The end of the world can', 'wait.'],
  },
];

const MAINTENANCE_EYE_STEP_TEXT: MaintenanceStep1Config = {
  prompt:
    "The exposed circuitry looks like face decor, though Xavier doesn't seem to notice.",
  choices: ['Use welding gun', 'Even it out'],
  afterScanQuotes: {
    choice0: [
      'I kinda miss the feeling of',
      'havng your "gun" pointed at me.',
    ],
    choice1: [
      'One side is a malfunction,',
      'but both sides make it',
      'fashion? Got it.',
    ],
  },
};

const MAINTENANCE_BATTERY_STEP_TEXT: MaintenanceStep2Config = {
  prompt:
    "There's never enough energy, time off, or money. At least an android's battery is easy to recharge.",
  choices: ['Urgently recharge', 'Use low power mode'],
  afterScanQuotes: {
    choice0: ['I thought your hand was a', 'cable. It works, though.'],
    choice1: [
      "Xavier's latest low power",
      'mode name: extra clingy.',
    ],
  },
  postCompleteDialogue: {
    choice0_0: DEFAULT_URGENT_DIALOGUE,
    choice0_1: DEFAULT_LOW_POWER_DIALOGUE,
    choice1_0: DEFAULT_URGENT_DIALOGUE,
    choice1_1: DEFAULT_LOW_POWER_DIALOGUE,
  },
};

// --- LOG - 2 ---
const LOG2_DIALOGUE_PART1_A: readonly ClinicDialogueLine[] = [
  {
    speaker: 'X',
    lines: ["We'll finish before Prehistoric", 'Metropolis airs.'],
  },
  {
    speaker: 'MC',
    lines: ['If we went back to that', 'time, what would you do?'],
  },
  {
    speaker: 'X',
    lines: ['Solve the energy problem.', "Don't worry..."],
  },
  {
    speaker: 'X',
    lines: ['Destruction is possible by', 'outliving your target.'],
  },
  {
    speaker: 'MC',
    lines: ['So prehistoric time travel', 'is a survival game?'],
  },
  {
    speaker: 'X',
    lines: ["Unlike the present, it's", 'full of uncertainty.'],
  },
];

const LOG2_DIALOGUE_PART1_B: readonly ClinicDialogueLine[] = [
  {
    speaker: 'X',
    lines: ["We'll finish before Prehistoric", 'Metropolis airs.'],
  },
  {
    speaker: 'MC',
    lines: ['If we went back to that', 'time, what would you do?'],
  },
  {
    speaker: 'X',
    lines: ["I'd take you to see cute,", 'fluffy mammoths.'],
  },
  {
    speaker: 'X',
    lines: ['Be careful when petting.', 'They might bite you.'],
  },
  {
    speaker: 'MC',
    lines: ['So prehistoric time travel', 'is a survival game?'],
  },
  {
    speaker: 'X',
    lines: ["Unlike the present, it's", 'full of uncertainty.'],
  },
];

const LOG2_DIALOGUE_PART2_A: readonly ClinicDialogueLine[] = [
  {
    speaker: 'MC',
    lines: ["Is that why you're drawn", 'to it?'],
  },
  {
    speaker: 'X',
    lines: ["Don't you feel the same", 'way?'],
  },
  {
    speaker: 'X',
    lines: ['If a new world appeared,', "we'd look at it..."],
  },
  {
    speaker: 'X',
    lines: ['Even if we had to risk', 'opening the door.'],
  },
];

const LOG2_DIALOGUE_PART2_B: readonly ClinicDialogueLine[] = [
  {
    speaker: 'MC',
    lines: ['If we go, we stick together.', 'No exceptions.'],
  },
  {
    speaker: 'X',
    lines: ["That's not just a rule for", 'prehistoric times.'],
  },
  {
    speaker: 'X',
    lines: ['It applies wherever we go.'],
  },
];

const MAINTENANCE_GYRO_STEP_TEXT: MaintenanceStep1Config = {
  prompt:
    'Xavier says the stars on the ceiling are spinning. I need to help him before he gets dizzier!',
  choices: ['Lull him to sleep', 'Calibrate gyroscope'],
  afterScanQuotes: {
    choice0: ['Zzz.'],
    choice1: [
      'Did you put the spinning',
      'stars away?',
    ],
  },
};

const MAINTENANCE_LOG2_STEP2_TEXT: MaintenanceStep2Config = {
  prompt:
    "Talk about a wardrobe malfunction! He points out that there's no one else here.",
  choices: ['Lend him my jacket', 'Use my hands'],
  afterScanQuotes: {
    choice0: [
      'Your jacket is tight, I',
      "hope it doesn't tear.",
    ],
    choice1: [
      'Your hand is hot. You',
      'need more help than me.',
    ],
  },
  postCompleteDialogue: {
    choice0_0: [...LOG2_DIALOGUE_PART1_A, ...LOG2_DIALOGUE_PART2_A],
    choice0_1: [...LOG2_DIALOGUE_PART1_A, ...LOG2_DIALOGUE_PART2_B],
    choice1_0: [...LOG2_DIALOGUE_PART1_B, ...LOG2_DIALOGUE_PART2_A],
    choice1_1: [...LOG2_DIALOGUE_PART1_B, ...LOG2_DIALOGUE_PART2_B],
  },
};

// --- LOG - 3 ---
const LOG3_DIALOGUE_PART1_A: readonly ClinicDialogueLine[] = [
  {
    speaker: 'X',
    lines: ['I got a new job offer.'],
  },
  {
    speaker: 'MC',
    lines: ['I thought we agreed to', 'stop working hard.'],
  },
  {
    speaker: 'X',
    lines: ['The pay is excellent.'],
  },
  {
    speaker: 'MC',
    lines: ["...I'm a hard-working", "citizen. What's the job?"],
  },
  {
    speaker: 'X',
    lines: ['Breaching the electronic', 'brain firewall to upgrade it.'],
  },
  {
    speaker: 'MC',
    lines: ['Give them the same shock', 'you gave me.'],
  },
  {
    speaker: 'MC',
    lines: ["I thought I'd feel lost", 'with no orders to follow.'],
  },
  {
    speaker: 'MC',
    lines: ['But anything we do feels', 'fun now.'],
  },
];

const LOG3_DIALOGUE_PART1_B: readonly ClinicDialogueLine[] = [
  {
    speaker: 'X',
    lines: ['I got a new job offer.'],
  },
  {
    speaker: 'MC',
    lines: ['I thought we agreed to', 'stop working hard.'],
  },
  {
    speaker: 'X',
    lines: ['The pay is excellent.'],
  },
  {
    speaker: 'MC',
    lines: ["...I'm a hard-working", "citizen. What's the job?"],
  },
  {
    speaker: 'X',
    lines: ['Rating a new stabilizer.', 'It is my specialty.'],
  },
  {
    speaker: 'MC',
    lines: ['Our taste buds are at', 'stake. Take it seriously.'],
  },
  {
    speaker: 'MC',
    lines: ["I thought I'd feel lost", 'with no orders to follow.'],
  },
  {
    speaker: 'MC',
    lines: ['But anything we do feels', 'fun now.'],
  },
];

const LOG3_DIALOGUE_PART2_A: readonly ClinicDialogueLine[] = [
  {
    speaker: 'X',
    lines: ['They say even humans fear', 'freedom sometimes.'],
  },
  {
    speaker: 'X',
    lines: ['Adrift in space and', 'choosing where to go...'],
  },
  {
    speaker: 'X',
    lines: ['Yet we already found', 'each other.'],
  },
];

const LOG3_DIALOGUE_PART2_B: readonly ClinicDialogueLine[] = [
  {
    speaker: 'X',
    lines: ["We don't need orders", 'anymore. We need a reason.'],
  },
  {
    speaker: 'X',
    lines: ['Luckily, we found one in', 'each other.'],
  },
];

const MAINTENANCE_PLANT_STEP_TEXT: MaintenanceStep1Config = {
  prompt:
    "Plants need to be cared for, even the ones on Xavier's head. I'll water them first, then...",
  choices: ['Dry his hair', 'Trim grass'],
  afterScanQuotes: {
    choice0: [
      "It's too dry now. The",
      'grass is moving out.',
    ],
    choice1: [
      "That wasn't just grass...",
      'It was the real me.',
    ],
  },
};

const MAINTENANCE_LOG3_STEP2_TEXT: MaintenanceStep2Config = {
  prompt:
    'Xavier leans in when I\'m to his left. Apparently, the words "I can\'t see" make it an accident.',
  choices: ['Take after recovery', 'Set a trend'],
  afterScanQuotes: {
    choice0: [
      'My eye is adjusting to the',
      "light. I'm not winking.",
    ],
    choice1: [
      'Eyepatches are all the',
      'rage in the Metropolis.',
    ],
  },
  postCompleteDialogue: {
    choice0_0: [...LOG3_DIALOGUE_PART1_A, ...LOG3_DIALOGUE_PART2_A],
    choice0_1: [...LOG3_DIALOGUE_PART1_A, ...LOG3_DIALOGUE_PART2_B],
    choice1_0: [...LOG3_DIALOGUE_PART1_B, ...LOG3_DIALOGUE_PART2_A],
    choice1_1: [...LOG3_DIALOGUE_PART1_B, ...LOG3_DIALOGUE_PART2_B],
  },
};

// --- LOG - 4 ---
const LOG4_DIALOGUE_PART1_A: readonly ClinicDialogueLine[] = [
  {
    speaker: 'MC',
    lines: ['Sometimes, what you say', 'immediately comes true.'],
  },
  {
    speaker: 'MC',
    lines: ['You predict danger too.'],
  },
  {
    speaker: 'X',
    lines: ["It's a standard threat", 'assessment.'],
  },
  {
    speaker: 'X',
    lines: ["But it's more accurate", "when you're around."],
  },
  {
    speaker: 'X',
    lines: ['Technically, my senses', 'sharpen around you.'],
  },
  {
    speaker: 'X',
    lines: ['If I really could see the', 'future...'],
  },
];

const LOG4_DIALOGUE_PART1_B: readonly ClinicDialogueLine[] = [
  {
    speaker: 'MC',
    lines: ['Sometimes, what you say', 'immediately comes true.'],
  },
  {
    speaker: 'X',
    lines: ["Like now. You'll look at", 'me unintentionally.'],
  },
  {
    speaker: 'MC',
    lines: ['...How did you know?'],
  },
  {
    speaker: 'X',
    lines: ['Your waist joint is loose.', "You're leaning my way."],
  },
  {
    speaker: 'X',
    lines: ['Technically, my senses', 'sharpen around you.'],
  },
  {
    speaker: 'X',
    lines: ['If I really could see the', 'future...'],
  },
];

const LOG4_DIALOGUE_PART2_A: readonly ClinicDialogueLine[] = [
  {
    speaker: 'X',
    lines: ["I'd say every day is good", 'for a walk.'],
  },
  {
    speaker: 'MC',
    lines: ["It'd still be true even", 'when it rains.'],
  },
  {
    speaker: 'MC',
    lines: ['We can share one', 'umbrella.'],
  },
];

const LOG4_DIALOGUE_PART2_B: readonly ClinicDialogueLine[] = [
  {
    speaker: 'X',
    lines: ["I'll say I'll be with you", 'every day.'],
  },
  {
    speaker: 'MC',
    lines: ['And future me would say', 'you were right.'],
  },
];

const MAINTENANCE_LOG4_STEP1_TEXT: MaintenanceStep1Config = {
  prompt:
    "Xavier is seeing double, maybe triple. That's not good. I'll fix him.",
  choices: ['Offer my shoulder', 'Remove interference'],
  afterScanQuotes: {
    choice0: [
      "There's nothing a nap by",
      "your side can't fix.",
    ],
    choice1: [
      'The cloning trick finally',
      'stopped working.',
    ],
  },
};

const MAINTENANCE_LOG4_STEP2_TEXT: MaintenanceStep2Config = {
  prompt:
    "There's Xavier when he's relaxed and when he's barely moving. I'll help him recharge!",
  choices: ['Hug to recharge', 'Charge slowly'],
  afterScanQuotes: {
    choice0: [
      'A hug charges an android',
      'twice as fast.',
    ],
    choice1: [
      'I want this quiet time',
      'with you to last.',
    ],
  },
  postCompleteDialogue: {
    choice0_0: [...LOG4_DIALOGUE_PART1_A, ...LOG4_DIALOGUE_PART2_A],
    choice0_1: [...LOG4_DIALOGUE_PART1_A, ...LOG4_DIALOGUE_PART2_B],
    choice1_0: [...LOG4_DIALOGUE_PART1_B, ...LOG4_DIALOGUE_PART2_A],
    choice1_1: [...LOG4_DIALOGUE_PART1_B, ...LOG4_DIALOGUE_PART2_B],
  },
};

// --- LOG - 5 ---
const LOG5_DIALOGUE_PART1_A: readonly ClinicDialogueLine[] = [
  {
    speaker: 'X',
    lines: ['Let me tell you a story about', 'an ordinary android...'],
  },
  {
    speaker: 'X',
    lines: ['...Who secretly saved the', 'world more than once.'],
  },
  {
    speaker: 'MC',
    lines: ["Oh! It's The Janitor", 'Android Is A Legend!'],
  },
  {
    speaker: 'X',
    lines: ["Wrong. It's our story."],
  },
  {
    speaker: 'MC',
    lines: ["Wait, I'm the legend?", 'Come to think of it...'],
  },
  {
    speaker: 'X',
    lines: ['There are still plenty of', 'things I dislike.'],
  },
  {
    speaker: 'X',
    lines: ['But the person I love', 'is here.'],
  },
  {
    speaker: 'MC',
    lines: ["Good thing we're unsung", 'heroes together.'],
  },
];

const LOG5_DIALOGUE_PART1_B: readonly ClinicDialogueLine[] = [
  {
    speaker: 'X',
    lines: ['Let me tell you a story about', 'an ordinary android...'],
  },
  {
    speaker: 'X',
    lines: ['...Who secretly saved the', 'world more than once.'],
  },
  {
    speaker: 'MC',
    lines: ["Oh! It's The Janitor", 'Android Is A Legend!'],
  },
  {
    speaker: 'X',
    lines: ["Wrong. It's our story."],
  },
  {
    speaker: 'MC',
    lines: ["Wait, I'm the legend?", 'Come to think of it...'],
  },
  {
    speaker: 'MC',
    lines: ["This world isn't perfect,", "but it's our home."],
  },
  {
    speaker: 'X',
    lines: ["It's my home now too."],
  },
  {
    speaker: 'MC',
    lines: ["Good thing we're unsung", 'heroes together.'],
  },
];

const LOG5_DIALOGUE_PART2_A: readonly ClinicDialogueLine[] = [
  {
    speaker: 'X',
    lines: ["It's not the secret that", 'makes me feel less alone.'],
  },
  {
    speaker: 'X',
    lines: ["It's how we want to protect", 'the same things.'],
  },
];

const LOG5_DIALOGUE_PART2_B: readonly ClinicDialogueLine[] = [
  {
    speaker: 'X',
    lines: ["So I'm important. Then", 'keep your eyes on me.'],
  },
  {
    speaker: 'MC',
    lines: ["Got it. It'll be like that", 'android show.'],
  },
  {
    speaker: 'MC',
    lines: ['Defeat the villain, then', 'fall for him...'],
  },
];

const MAINTENANCE_LOG5_STEP1_TEXT: MaintenanceStep1Config = {
  prompt:
    'Who installed that photosynthesis add-on? Its only purpose is to look cute...',
  choices: ['Hide it in his hair', 'Uproot the sprout'],
  afterScanQuotes: {
    choice0: ['Did I just get a little', 'taller?'],
    choice1: ['Huh? My signal receiver', 'went offline.'],
  },
};

const MAINTENANCE_LOG5_STEP2_TEXT: MaintenanceStep2Config = {
  prompt:
    "Xavier seems to have something on his mind. I'll find a way to cover it up for him.",
  choices: ['Apply makeup', 'Cover his eyes'],
  afterScanQuotes: {
    choice0: [
      'You are so gentle. I want to',
      'lean against you and nap',
      'for a bit.',
    ],
    choice1: [
      "I can't see the circuits",
      "anymore. I can't see the",
      'road either.',
    ],
  },
  postCompleteDialogue: {
    choice0_0: [...LOG5_DIALOGUE_PART1_A, ...LOG5_DIALOGUE_PART2_A],
    choice0_1: [...LOG5_DIALOGUE_PART1_A, ...LOG5_DIALOGUE_PART2_B],
    choice1_0: [...LOG5_DIALOGUE_PART1_B, ...LOG5_DIALOGUE_PART2_A],
    choice1_1: [...LOG5_DIALOGUE_PART1_B, ...LOG5_DIALOGUE_PART2_B],
  },
};

export interface ChapterAssetItem {
  chapter: number;
  label: string;
  normalRemote: string;
  normalRawRemote: string;
  normalLocal: string;
  selectRemote: string;
  selectRawRemote: string;
  selectLocal: string;
}

// Ordered from 5 down to 0 for visual clarity; z-index is controlled via data-chapter in CSS
const MEMORY_CHAPTERS: ChapterAssetItem[] = [
  {
    chapter: 5,
    label: '05 Chapter 5',
    normalRemote: `${CLOUDINARY_OPT}/v1794208497/5.webp`,
    normalRawRemote: `${CLOUDINARY_RAW}/v1794208497/5.webp`,
    normalLocal: '/assets/aistudio/5.webp',
    selectRemote: `${CLOUDINARY_OPT}/v1794208495/5-select.webp`,
    selectRawRemote: `${CLOUDINARY_RAW}/v1794208495/5-select.webp`,
    selectLocal: '/assets/aistudio/5-select.webp',
  },
  {
    chapter: 4,
    label: '04 Chapter 4',
    normalRemote: `${CLOUDINARY_OPT}/v1794208491/4.webp`,
    normalRawRemote: `${CLOUDINARY_RAW}/v1794208491/4.webp`,
    normalLocal: '/assets/aistudio/4.webp',
    selectRemote: `${CLOUDINARY_OPT}/v1794208493/4-select.webp`,
    selectRawRemote: `${CLOUDINARY_RAW}/v1794208493/4-select.webp`,
    selectLocal: '/assets/aistudio/4-select.webp',
  },
  {
    chapter: 3,
    label: '03 Chapter 3',
    normalRemote: `${CLOUDINARY_OPT}/v1794208385/3.webp`,
    normalRawRemote: `${CLOUDINARY_RAW}/v1794208385/3.webp`,
    normalLocal: '/assets/aistudio/3.webp',
    selectRemote: `${CLOUDINARY_OPT}/v1794208383/3-select.webp`,
    selectRawRemote: `${CLOUDINARY_RAW}/v1794208383/3-select.webp`,
    selectLocal: '/assets/aistudio/3-select.webp',
  },
  {
    chapter: 2,
    label: '02 Chapter 2',
    normalRemote: `${CLOUDINARY_OPT}/v1794208378/2.webp`,
    normalRawRemote: `${CLOUDINARY_RAW}/v1794208378/2.webp`,
    normalLocal: '/assets/aistudio/2.webp',
    selectRemote: `${CLOUDINARY_OPT}/v1794208380/2-select.webp`,
    selectRawRemote: `${CLOUDINARY_RAW}/v1794208380/2-select.webp`,
    selectLocal: '/assets/aistudio/2-select.webp',
  },
  {
    chapter: 1,
    label: '01 Chapter 1',
    normalRemote: `${CLOUDINARY_OPT}/v1794208377/1.webp`,
    normalRawRemote: `${CLOUDINARY_RAW}/v1794208377/1.webp`,
    normalLocal: '/assets/aistudio/1.webp',
    selectRemote: `${CLOUDINARY_OPT}/v1794208373/1-select.webp`,
    selectRawRemote: `${CLOUDINARY_RAW}/v1794208373/1-select.webp`,
    selectLocal: '/assets/aistudio/1-select.webp',
  },
  {
    chapter: 0,
    label: '00 Prologue',
    normalRemote: `${CLOUDINARY_OPT}/v1794208374/0.webp`,
    normalRawRemote: `${CLOUDINARY_RAW}/v1794208374/0.webp`,
    normalLocal: '/assets/aistudio/0.webp',
    selectRemote: `${CLOUDINARY_OPT}/v1794208374/0-select.webp`,
    selectRawRemote: `${CLOUDINARY_RAW}/v1794208374/0-select.webp`,
    selectLocal: '/assets/aistudio/0-select.webp',
  },
];

interface FallbackImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  remoteSrc: string;
  rawRemoteSrc?: string;
  localSrc: string;
  onAssetReady?: () => void;
}

const AssetImg: React.FC<FallbackImgProps> = React.memo(({
  remoteSrc,
  rawRemoteSrc,
  localSrc,
  alt,
  onAssetReady,
  ...rest
}) => {
  const [src, setSrc] = useState<string>(remoteSrc);

  useEffect(() => {
    setSrc(remoteSrc);
  }, [remoteSrc]);

  return (
    <img
      src={src}
      alt={alt}
      decoding="async"
      draggable={false}
      onLoad={() => {
        onAssetReady?.();
      }}
      onError={() => {
        if (rawRemoteSrc && src === remoteSrc) {
          setSrc(rawRemoteSrc);
        } else if (src !== localSrc) {
          setSrc(localSrc);
        } else {
          onAssetReady?.();
        }
      }}
      {...rest}
    />
  );
});

type GlitchtopiaPage =
  | 'hub'
  | 'memory-terminal'
  | 'care-log'
  | 'restore-clinic'
  | 'defense-intercept';
const GLITCHTOPIA_SLUG = '/glitchtopia';

function getInitialLang(): 'VI' | 'EN' {
  if (typeof window === 'undefined') return 'VI';
  try {
    const params = new URLSearchParams(window.location.search);
    const qLang = params.get('lang')?.toUpperCase();
    if (qLang === 'EN' || qLang === 'VI') return qLang;

    const saved = window.localStorage.getItem('tsdt_lang')?.toUpperCase();
    if (saved === 'EN' || saved === 'VI') return saved;
  } catch {
    // Ignore storage access errors in restricted iframes
  }
  return 'VI';
}

export default function App() {
  const [lang, setLang] = useState<'VI' | 'EN'>(getInitialLang);
  const [currentPage, setCurrentPage] = useState<GlitchtopiaPage>('hub');
  const [isWallReady, setIsWallReady] = useState<boolean>(false);

  // For Memory Terminal chapter cards:
  // - hoveredChapter: active on PC/Laptop hover
  // - tappedChapter: active on 1st tap/click on Phone/Tablet
  // - chosenChapter: triggered on 2nd tap/click (Phone/Tablet) or click while hovered (PC)
  const [hoveredChapter, setHoveredChapter] = useState<number | null>(null);
  const [tappedChapter, setTappedChapter] = useState<number | null>(null);
  const [chosenChapter, setChosenChapter] = useState<number | null>(null);

  // Robot Plant Pot 3-expression cycle (0: vertical pixel eyes, 1: horizontal sleeping bars, 2: hollow circles + arcs)
  const [plantFaceIndex, setPlantFaceIndex] = useState<number>(0);

  // Hologram Computer 3-skin cycle (0: computer-0, 1: computer-1, 2: computer-2)
  const [computerSkinIndex, setComputerSkinIndex] = useState<number>(0);

  // Care Log interactive log boxes (Log - 1 .. Log - 6)
  const [hoveredCareLog, setHoveredCareLog] = useState<number | null>(null);
  const [selectedCareLog, setSelectedCareLog] = useState<number | null>(null);

  // Floating Robot Drone bubble burst interaction state:
  // When clicked, the 3 ambient bubbles disappear, a burst of small bubbles flies out and fades over 1.6s,
  // then the original 3 ambient bubbles smoothly return.
  const [isRobotBursting, setIsRobotBursting] = useState<boolean>(false);
  const [robotBurstKey, setRobotBurstKey] = useState<number>(0);
  const robotBurstTimerRef = useRef<number | null>(null);

  // Restore Clinic scanning phase:
  // - 'idle': scan-button visible, chibi-care visible
  // - 'scanning': scan-button hidden, scanning.webp sweeps from top of head down to hand
  // - 'done': scanning.webp disappears, chibi-care replaced by chibi1-eyebattery at exact same spot
  const [clinicScanPhase, setClinicScanPhase] = useState<'idle' | 'scanning' | 'done'>('idle');
  // Dialogue step after scan completes:
  // - 0: hidden
  // - 1: top dark-blue bubble ("System error. I need some time for repairs.")
  // - 2: lower-right red bubble ("Then let me switch to caretaker mode." without "Lys Stargazer")
  // - 3: top-center blue holographic "Diagnostic Checklist" board + bottom "Start" button
  // - 4: zoomed-in chibi1-eye + bottom grid prompt & 2 choice buttons ("Use welding gun" / "Even it out")
  // - 5: zoomed-in chibi-scan playing 1 cycle (7560ms) after clicking either choice button
  // - 6: zoomed-in chibi1-battery + top dark-blue speech bubble ("I kinda miss the feeling of havng your "gun" pointed at me.")
  // - 7: Diagnostic Checklist board (with "Circuitry visible below..." dimmed) + bottom "Continue" button
  // - 8: zoomed-in chibi1-battery + bottom grid prompt & 2 choice buttons ("Urgently recharge" / "Use low power mode")
  // - 9: zoomed-in chibi-scan2 playing 1 cycle (5046ms) after clicking "Urgently recharge" or "Use low power mode"
  // - 10: zoomed-in chibi-idle + initial speech bubble ("I thought your hand was a cable..." or "Xavier's latest low power mode name...")
  // - 11: full-body chibi-happy playing 1 cycle (1950ms) -> chibi-idle + top "Complete!" banner + speech bubble ("Fixed. Now I can rest with a full battery.") + bottom "Tap to continue"
  // - 12: full-body chibi-idle + 9-turn X (blue) / MC (red) dialogue sequence
  const [clinicDialogueStep, setClinicDialogueStep] = useState<
    0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  >(0);
  const [firstChoiceIndex, setFirstChoiceIndex] = useState<0 | 1>(0);
  const [batteryChoiceIndex, setBatteryChoiceIndex] = useState<0 | 1>(0);
  const [batteryDialogueIdx, setBatteryDialogueIdx] = useState<number>(0);
  const maintenanceTextRef = useRef<HTMLSpanElement | null>(null);

  const activeStep1Config =
    selectedCareLog === 5
      ? MAINTENANCE_LOG5_STEP1_TEXT
      : selectedCareLog === 4
        ? MAINTENANCE_LOG4_STEP1_TEXT
        : selectedCareLog === 3
          ? MAINTENANCE_PLANT_STEP_TEXT
          : selectedCareLog === 2
            ? MAINTENANCE_GYRO_STEP_TEXT
            : MAINTENANCE_EYE_STEP_TEXT;

  const activeStep2Config =
    selectedCareLog === 5
      ? MAINTENANCE_LOG5_STEP2_TEXT
      : selectedCareLog === 4
        ? MAINTENANCE_LOG4_STEP2_TEXT
        : selectedCareLog === 3
          ? MAINTENANCE_LOG3_STEP2_TEXT
          : selectedCareLog === 2
            ? MAINTENANCE_LOG2_STEP2_TEXT
            : MAINTENANCE_BATTERY_STEP_TEXT;
  const chibiScanBlobRef = useRef<Blob | null>(null);
  const activeChibiScanUrlRef = useRef<string | null>(null);
  const [chibiScanPlaySrc, setChibiScanPlaySrc] = useState<string | null>(null);
  const [isChibiScanReady, setIsChibiScanReady] = useState<boolean>(false);
  const [isBatteryPreRevealed, setIsBatteryPreRevealed] = useState<boolean>(false);

  const chibiScan2BlobRef = useRef<Blob | null>(null);
  const activeChibiScan2UrlRef = useRef<string | null>(null);
  const [chibiScan2PlaySrc, setChibiScan2PlaySrc] = useState<string | null>(null);
  const [isChibiScan2Ready, setIsChibiScan2Ready] = useState<boolean>(false);
  const [isIdlePreRevealed, setIsIdlePreRevealed] = useState<boolean>(false);

  // Step 11 (Complete!) chibi-happy 1-cycle -> chibi-idle state & timers
  const activeClinicHappyUrlRef = useRef<string | null>(null);
  const [clinicHappyPlaySrc, setClinicHappyPlaySrc] = useState<string | null>(null);
  const [isClinicIdleMasked, setIsClinicIdleMasked] = useState<boolean>(false);
  const clinicRevealIdleTimerRef = useRef<number | null>(null);
  const clinicHideHappyTimerRef = useRef<number | null>(null);

  const clearClinicHappyTimers = useCallback(() => {
    if (clinicRevealIdleTimerRef.current !== null) {
      window.clearTimeout(clinicRevealIdleTimerRef.current);
      clinicRevealIdleTimerRef.current = null;
    }
    if (clinicHideHappyTimerRef.current !== null) {
      window.clearTimeout(clinicHideHappyTimerRef.current);
      clinicHideHappyTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (clinicScanPhase !== 'scanning') return;
    const timer = window.setTimeout(() => {
      setClinicScanPhase('done');
      setClinicDialogueStep(1);
    }, 2120);
    return () => window.clearTimeout(timer);
  }, [clinicScanPhase]);

  // Once chibi-scan starts playing (step 5 & ready), reveal zoomed chibi1-battery underneath at 7400ms
  // and switch cleanly to step 6 at 7470ms (before 7560ms loop-back) so there is zero blink/flicker.
  useEffect(() => {
    if (clinicDialogueStep !== 5 || !isChibiScanReady) return;
    setIsBatteryPreRevealed(false);
    const revealTimer = window.setTimeout(() => {
      setIsBatteryPreRevealed(true);
    }, 7400);
    const switchTimer = window.setTimeout(() => {
      setClinicDialogueStep(6);
      setIsBatteryPreRevealed(false);
    }, 7470);
    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(switchTimer);
    };
  }, [clinicDialogueStep, isChibiScanReady]);

  // Once chibi-scan2 starts playing (step 9 & ready, 174 frames * 29ms = 5046ms), reveal zoomed chibi-idle
  // underneath at 4890ms and switch cleanly to step 10 at 4960ms so there is zero blink/flicker.
  useEffect(() => {
    if (clinicDialogueStep !== 9 || !isChibiScan2Ready) return;
    setIsIdlePreRevealed(false);
    const revealTimer = window.setTimeout(() => {
      setIsIdlePreRevealed(true);
    }, 4890);
    const switchTimer = window.setTimeout(() => {
      setBatteryDialogueIdx(0);
      setClinicDialogueStep(10);
      setIsIdlePreRevealed(false);
    }, 4960);
    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(switchTimer);
    };
  }, [clinicDialogueStep, isChibiScan2Ready]);

  // Animate "Maintenance in progress ...%" smoothly from 0% to 100% whenever a scan is active
  const isMaintenanceScanning =
    clinicScanPhase === 'scanning' ||
    (clinicScanPhase === 'done' &&
      (clinicDialogueStep === 5 || clinicDialogueStep === 9));

  useEffect(() => {
    const updateLabel = (pct: number) => {
      if (maintenanceTextRef.current) {
        maintenanceTextRef.current.textContent = `Maintenance in progress ${pct}%`;
      }
    };

    if (!isMaintenanceScanning) {
      updateLabel(0);
      return;
    }

    const durationMs =
      clinicScanPhase === 'scanning'
        ? 2060
        : clinicDialogueStep === 5
          ? 7380
          : 4880;
    const isWaitDecoding =
      (clinicDialogueStep === 5 && !isChibiScanReady) ||
      (clinicDialogueStep === 9 && !isChibiScan2Ready);

    if (isWaitDecoding) {
      updateLabel(0);
      return;
    }

    updateLabel(0);
    const startTime = performance.now();
    let rafId = 0;
    let lastPct = -1;

    const tick = (now: number) => {
      const ratio = Math.min(1, Math.max(0, (now - startTime) / durationMs));
      const pct = Math.min(100, Math.round(ratio * 100));
      if (pct !== lastPct) {
        lastPct = pct;
        updateLabel(pct);
      }
      if (ratio < 1) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    rafId = window.requestAnimationFrame(tick);
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [
    isMaintenanceScanning,
    clinicScanPhase,
    clinicDialogueStep,
    isChibiScanReady,
    isChibiScan2Ready,
  ]);

  // Chibi reaction interaction (happy / puzzled / question) & speech bubble state
  // Cached in-memory Blobs so each click creates a fresh ObjectURL that starts WebP playback strictly from Frame 0 (0ms)
  const happyBlobRef = useRef<Blob | null>(null);
  const puzzledBlobRef = useRef<Blob | null>(null);
  const questionBlobRef = useRef<Blob | null>(null);
  const activeObjectUrlRef = useRef<string | null>(null);
  const isHappyPlayingRef = useRef<boolean>(false);
  const activeReactionSourceRef = useRef<'chibi' | 'plant' | 'computer' | 'robot'>('chibi');
  const activeReactionPoseRef = useRef<'happy' | 'puzzled' | 'question'>('happy');
  const [happyPlaySrc, setHappyPlaySrc] = useState<string | null>(null);
  const [happyPlayKey, setHappyPlayKey] = useState<number>(0);
  const [activeReactionPose, setActiveReactionPose] = useState<
    'happy' | 'puzzled' | 'question'
  >('happy');
  const [isIdleMasked, setIsIdleMasked] = useState<boolean>(false);
  const [showSpeechBubble, setShowSpeechBubble] = useState<boolean>(false);
  const [speechSource, setSpeechSource] = useState<
    'chibi' | 'plant' | 'computer' | 'robot'
  >('chibi');

  const revealIdleTimerRef = useRef<number | null>(null);
  const hideHappyTimerRef = useRef<number | null>(null);

  const clearChibiTimers = useCallback(() => {
    if (revealIdleTimerRef.current !== null) {
      window.clearTimeout(revealIdleTimerRef.current);
      revealIdleTimerRef.current = null;
    }
    if (hideHappyTimerRef.current !== null) {
      window.clearTimeout(hideHappyTimerRef.current);
      hideHappyTimerRef.current = null;
    }
  }, []);

  // Pre-fetch chibi-happy, chibi-puzzled, and chibi-question binaries into RAM once so every click plays from Frame 0 instantaneously
  useEffect(() => {
    let cancelled = false;
    async function loadBlob(
      candidates: string[],
      targetRef: React.MutableRefObject<Blob | null>
    ) {
      for (const url of candidates) {
        try {
          const res = await fetch(url);
          if (res.ok) {
            const buf = await res.arrayBuffer();
            if (!cancelled) {
              targetRef.current = new Blob([buf], { type: 'image/webp' });
            }
            return;
          }
        } catch {
          // Try next fallback candidate
        }
      }
    }
    loadBlob([ASSETS.chibiHappy.remote, ASSETS.chibiHappy.local], happyBlobRef);
    loadBlob([ASSETS.chibiPuzzled.remote], puzzledBlobRef);
    loadBlob([ASSETS.chibiQuestion.remote], questionBlobRef);
    return () => {
      cancelled = true;
      clearChibiTimers();
      isHappyPlayingRef.current = false;
      if (activeObjectUrlRef.current) {
        URL.revokeObjectURL(activeObjectUrlRef.current);
        activeObjectUrlRef.current = null;
      }
      if (activeChibiScanUrlRef.current) {
        URL.revokeObjectURL(activeChibiScanUrlRef.current);
        activeChibiScanUrlRef.current = null;
      }
      if (activeChibiScan2UrlRef.current) {
        URL.revokeObjectURL(activeChibiScan2UrlRef.current);
        activeChibiScan2UrlRef.current = null;
      }
      if (activeClinicHappyUrlRef.current) {
        URL.revokeObjectURL(activeClinicHappyUrlRef.current);
        activeClinicHappyUrlRef.current = null;
      }
      clearClinicHappyTimers();
    };
  }, [clearChibiTimers, clearClinicHappyTimers]);

  const triggerChibiReaction = useCallback(
    (source: 'chibi' | 'plant' | 'computer' | 'robot') => {
      // If the exact same source is already playing, let it finish its cycle smoothly
      if (isHappyPlayingRef.current && activeReactionSourceRef.current === source) {
        return;
      }

      const nextPose: 'happy' | 'puzzled' | 'question' =
        source === 'computer'
          ? 'puzzled'
          : source === 'robot'
            ? 'question'
            : source === 'chibi'
              ? Math.random() < 0.5
                ? 'happy'
                : 'puzzled'
              : 'happy';

      activeReactionSourceRef.current = source;
      activeReactionPoseRef.current = nextPose;
      setSpeechSource(source);
      setActiveReactionPose(nextPose);
      isHappyPlayingRef.current = true;
      clearChibiTimers();

      const blob =
        nextPose === 'puzzled'
          ? puzzledBlobRef.current
          : nextPose === 'question'
            ? questionBlobRef.current
            : happyBlobRef.current;

      const fallbackUrl =
        nextPose === 'puzzled'
          ? ASSETS.chibiPuzzled.remote
          : nextPose === 'question'
            ? ASSETS.chibiQuestion.remote
            : ASSETS.chibiHappy.remote;

      // Create a fresh in-memory ObjectURL so the browser starts WebP animation at Frame 0
      let nextSrc: string;
      if (blob) {
        if (activeObjectUrlRef.current) {
          URL.revokeObjectURL(activeObjectUrlRef.current);
        }
        nextSrc = URL.createObjectURL(blob);
        activeObjectUrlRef.current = nextSrc;
      } else {
        nextSrc = `${fallbackUrl}?t=${Date.now()}`;
      }

      setHappyPlayKey((k) => k + 1);
      setHappyPlaySrc(nextSrc);
    },
    [clearChibiTimers]
  );

  const handleChibiClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      sound.playSuccess();
      triggerChibiReaction('chibi');
    },
    [triggerChibiReaction]
  );

  const handlePlantClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      sound.playSelect();
      setPlantFaceIndex((prev) => (prev + 1) % 3);
      triggerChibiReaction('plant');
    },
    [triggerChibiReaction]
  );

  const handleComputerClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      sound.playSelect();
      setComputerSkinIndex((prev) => (prev + 1) % 3);
      triggerChibiReaction('computer');
    },
    [triggerChibiReaction]
  );

  const handleRobotClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      sound.playSelect();
      setIsRobotBursting(true);
      setRobotBurstKey((k) => k + 1);
      triggerChibiReaction('robot');

      if (robotBurstTimerRef.current !== null) {
        window.clearTimeout(robotBurstTimerRef.current);
      }
      // After 2785ms (1 full chibi-question cycle), all bursting bubbles fade away and the 3 original bubbles return right as the quote ends
      robotBurstTimerRef.current = window.setTimeout(() => {
        setIsRobotBursting(false);
        robotBurstTimerRef.current = null;
      }, 2785);
    },
    [triggerChibiReaction]
  );

  // Cleanup robot burst timer on unmount
  useEffect(() => {
    return () => {
      if (robotBurstTimerRef.current !== null) {
        window.clearTimeout(robotBurstTimerRef.current);
      }
    };
  }, []);

  // Fired the instant Frame 0 of the fresh chibi reaction ObjectURL is decoded & painted
  const handleHappyFrameZeroReady = useCallback(() => {
    setIsIdleMasked(true);
    setShowSpeechBubble(true);

    if (revealIdleTimerRef.current !== null) {
      window.clearTimeout(revealIdleTimerRef.current);
    }
    if (hideHappyTimerRef.current !== null) {
      window.clearTimeout(hideHappyTimerRef.current);
    }

    const src = activeReactionSourceRef.current;
    const pose = activeReactionPoseRef.current;
    // Exact 1-cycle durations from WebP ANMF frame headers:
    // - chibi-happy: 30 frames * 65ms = 1950ms
    // - chibi-puzzled: 32 frames * 65ms = 2080ms
    // - chibi-question: 43 frames * 65ms = 2795ms
    const cycleMs = pose === 'question' ? 2785 : pose === 'puzzled' ? 2070 : 1940;
    const revealIdleMs = cycleMs - 55;

    // Step 1: restore idle chibi opacity to 1 underneath BEFORE removing reaction layer
    revealIdleTimerRef.current = window.setTimeout(() => {
      setIsIdleMasked(false);
      revealIdleTimerRef.current = null;
    }, revealIdleMs);

    // Step 2: unmount reaction layer and hide speech bubble simultaneously (and restore robot bubbles if source === 'robot')
    hideHappyTimerRef.current = window.setTimeout(() => {
      setHappyPlaySrc(null);
      setShowSpeechBubble(false);
      if (src === 'robot') {
        setIsRobotBursting(false);
        if (robotBurstTimerRef.current !== null) {
          window.clearTimeout(robotBurstTimerRef.current);
          robotBurstTimerRef.current = null;
        }
      }
      isHappyPlayingRef.current = false;
      hideHappyTimerRef.current = null;
    }, cycleMs);
  }, []);

  // Ensure URL bar always has the /glitchtopia slug for this event
  useEffect(() => {
    try {
      const currentPath = window.location.pathname.replace(/\/+$/, '');
      if (!currentPath || currentPath === '' || currentPath === '/events/glitchtopia') {
        const targetUrl =
          GLITCHTOPIA_SLUG + window.location.search + window.location.hash;
        window.history.replaceState(
          { eventSlug: 'glitchtopia', glitchtopiaPage: 'hub' },
          '',
          targetUrl
        );
      }
    } catch {
      // Ignore history replaceState errors in restricted environments
    }
  }, []);

  // Sync document title, <html lang>, and localStorage when language changes
  useEffect(() => {
    document.title = lang === 'VI' ? 'Trăng Soi Dặm Trường - SK' : 'Moonstride - Events';
    document.documentElement.lang = lang === 'VI' ? 'vi' : 'en';
    try {
      window.localStorage.setItem('tsdt_lang', lang);
    } catch {
      // Ignore storage errors
    }
  }, [lang]);

  // Safety fallback timer so the stage never stays hidden if network is slow
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsWallReady(true);
    }, 450);
    return () => window.clearTimeout(timer);
  }, []);

  // Sequential low-priority preloader (max 2 concurrent decodes) so Hub animations stay locked at 60fps
  const preloadedUrlsRef = useRef<Set<string>>(new Set());
  const enqueuePreload = useCallback((urls: string[]) => {
    const pending = urls.filter((u) => {
      if (preloadedUrlsRef.current.has(u)) return false;
      preloadedUrlsRef.current.add(u);
      return true;
    });
    if (pending.length === 0) return;

    let idx = 0;
    const loadNext = () => {
      if (idx >= pending.length) return;
      const url = pending[idx++];
      const img = new Image();
      img.decoding = 'async';
      img.onload = img.onerror = () => {
        if (typeof window.requestIdleCallback === 'function') {
          window.requestIdleCallback(loadNext);
        } else {
          setTimeout(loadNext, 40);
        }
      };
      img.src = url;
    };

    // Run 2 sequential workers in parallel
    loadNext();
    loadNext();
  }, []);

  // Tier 1: After Hub wall is ready, gently preload Hub interactive skins & sub-page walls
  useEffect(() => {
    if (!isWallReady) return;
    const timer = window.setTimeout(() => {
      enqueuePreload([
        ASSETS.computer1.remote,
        ASSETS.computer2.remote,
        ASSETS.careLogWall.remote,
        ASSETS.memoryWall.remote,
        ASSETS.restoreClinicWall.remote,
        ASSETS.scanButton.remote,
        ASSETS.chibiCare.remote,
        ASSETS.scanning.remote,
      ]);
    }, 350);
    return () => window.clearTimeout(timer);
  }, [isWallReady, enqueuePreload]);

  // Tier 2: Preload Memory Terminal cards or Care Log chibis based on active page
  useEffect(() => {
    if (currentPage === 'memory-terminal') {
      enqueuePreload(
        MEMORY_CHAPTERS.flatMap((c) => [c.normalRemote, c.selectRemote])
      );
    } else if (currentPage === 'care-log' || currentPage === 'restore-clinic') {
      enqueuePreload([
        ASSETS.chibiEyeBattery.remote,
        ASSETS.chibiStarTorn.remote,
        ASSETS.chibiPlantPatch.remote,
        ASSETS.chibiPlant.remote,
        ASSETS.chibiPatch.remote,
        ASSETS.chibiEye.remote,
        ASSETS.chibiBattery.remote,
      ]);

      // Pre-fetch chibi-scan & chibi-scan2 binaries into RAM from Cloudinary when user enters Restore Clinic
      if (currentPage === 'restore-clinic' && !chibiScanBlobRef.current) {
        (async () => {
          try {
            const res = await fetch(ASSETS.chibiScan.remote);
            if (res.ok && !chibiScanBlobRef.current) {
              const buf = await res.arrayBuffer();
              chibiScanBlobRef.current = new Blob([buf], { type: 'image/webp' });
            }
          } catch {
            // Fallback to direct URL if fetch fails
          }
        })();
      }
      if (currentPage === 'restore-clinic' && !chibiScan2BlobRef.current) {
        (async () => {
          try {
            const res = await fetch(ASSETS.chibiScan2.remote);
            if (res.ok && !chibiScan2BlobRef.current) {
              const buf = await res.arrayBuffer();
              chibiScan2BlobRef.current = new Blob([buf], { type: 'image/webp' });
            }
          } catch {
            // Fallback to direct URL if fetch fails
          }
        })();
      }
    }
  }, [currentPage, enqueuePreload]);

  // Sync browser Back button / mobile edge-swipe with sub-page state (keeping /glitchtopia slug)
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const statePage = event.state?.glitchtopiaPage;
      const targetPage: GlitchtopiaPage =
        statePage === 'memory-terminal' ||
        statePage === 'care-log' ||
        statePage === 'restore-clinic' ||
        statePage === 'defense-intercept'
          ? statePage
          : 'hub';
      setClinicScanPhase('idle');
      setClinicDialogueStep(0);
      setHoveredChapter(null);
      setTappedChapter(null);
      setChosenChapter(null);
      setCurrentPage(targetPage);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const openDefenseIntercept = useCallback(() => {
    sound.playSelect();
    setHoveredChapter(null);
    setTappedChapter(null);
    setChosenChapter(null);
    setCurrentPage('defense-intercept');

    try {
      const targetUrl =
        GLITCHTOPIA_SLUG + window.location.search + window.location.hash;
      window.history.pushState(
        { eventSlug: 'glitchtopia', glitchtopiaPage: 'defense-intercept' },
        '',
        targetUrl
      );
    } catch {
      // Ignore history pushState errors in sandboxed environments
    }
  }, []);

  const openMemoryTerminal = useCallback(() => {
    sound.playSelect();
    setHoveredChapter(null);
    setTappedChapter(null);
    setChosenChapter(null);
    setCurrentPage('memory-terminal');

    try {
      const targetUrl =
        GLITCHTOPIA_SLUG + window.location.search + window.location.hash;
      window.history.pushState(
        { eventSlug: 'glitchtopia', glitchtopiaPage: 'memory-terminal' },
        '',
        targetUrl
      );
    } catch {
      // Ignore history pushState errors in sandboxed environments
    }
  }, []);

  const openCareLog = useCallback(() => {
    sound.playSelect();
    setHoveredChapter(null);
    setTappedChapter(null);
    setChosenChapter(null);
    setCurrentPage('care-log');

    try {
      const targetUrl =
        GLITCHTOPIA_SLUG + window.location.search + window.location.hash;
      window.history.pushState(
        { eventSlug: 'glitchtopia', glitchtopiaPage: 'care-log' },
        '',
        targetUrl
      );
    } catch {
      // Ignore history pushState errors in sandboxed environments
    }
  }, []);

  const openRestoreClinic = useCallback((logId: number) => {
    sound.playSelect();
    clearClinicHappyTimers();
    setSelectedCareLog(logId);
    setClinicScanPhase('idle');
    setClinicDialogueStep(0);
    setFirstChoiceIndex(0);
    setBatteryChoiceIndex(0);
    setBatteryDialogueIdx(0);
    setIsChibiScanReady(false);
    setIsBatteryPreRevealed(false);
    setChibiScanPlaySrc(null);
    setIsChibiScan2Ready(false);
    setIsIdlePreRevealed(false);
    setChibiScan2PlaySrc(null);
    setClinicHappyPlaySrc(null);
    setIsClinicIdleMasked(false);
    setHoveredCareLog(null);
    setHoveredChapter(null);
    setTappedChapter(null);
    setChosenChapter(null);
    setCurrentPage('restore-clinic');

    try {
      const targetUrl =
        GLITCHTOPIA_SLUG + window.location.search + window.location.hash;
      window.history.pushState(
        { eventSlug: 'glitchtopia', glitchtopiaPage: 'restore-clinic' },
        '',
        targetUrl
      );
    } catch {
      // Ignore history pushState errors in sandboxed environments
    }
  }, [clearClinicHappyTimers]);

  const triggerChibiScanStep = useCallback((choiceIdx: 0 | 1 = 0) => {
    sound.playSuccess();
    setFirstChoiceIndex(choiceIdx);
    setIsChibiScanReady(false);
    setIsBatteryPreRevealed(false);
    let nextSrc: string;
    if (chibiScanBlobRef.current) {
      if (activeChibiScanUrlRef.current) {
        URL.revokeObjectURL(activeChibiScanUrlRef.current);
      }
      nextSrc = URL.createObjectURL(chibiScanBlobRef.current);
      activeChibiScanUrlRef.current = nextSrc;
    } else {
      nextSrc = `${ASSETS.chibiScan.remote}?t=${Date.now()}`;
    }
    setChibiScanPlaySrc(nextSrc);
    setClinicDialogueStep(5);
  }, []);

  const triggerChibiScan2Step = useCallback((choiceIdx: 0 | 1) => {
    sound.playSuccess();
    setBatteryChoiceIndex(choiceIdx);
    setBatteryDialogueIdx(0);
    setIsChibiScan2Ready(false);
    setIsIdlePreRevealed(false);
    let nextSrc: string;
    if (chibiScan2BlobRef.current) {
      if (activeChibiScan2UrlRef.current) {
        URL.revokeObjectURL(activeChibiScan2UrlRef.current);
      }
      nextSrc = URL.createObjectURL(chibiScan2BlobRef.current);
      activeChibiScan2UrlRef.current = nextSrc;
    } else {
      nextSrc = `${ASSETS.chibiScan2.remote}?t=${Date.now()}`;
    }
    setChibiScan2PlaySrc(nextSrc);
    setClinicDialogueStep(9);
  }, []);

  const triggerClinicCompleteStep = useCallback(() => {
    sound.playSuccess();
    clearClinicHappyTimers();
    let nextSrc: string;
    if (happyBlobRef.current) {
      if (activeClinicHappyUrlRef.current) {
        URL.revokeObjectURL(activeClinicHappyUrlRef.current);
      }
      nextSrc = URL.createObjectURL(happyBlobRef.current);
      activeClinicHappyUrlRef.current = nextSrc;
    } else {
      nextSrc = `${ASSETS.chibiHappy.remote}?t=${Date.now()}`;
    }
    setIsClinicIdleMasked(true);
    setClinicHappyPlaySrc(nextSrc);
    setClinicDialogueStep(11);
  }, [clearClinicHappyTimers]);

  const handleClinicHappyFrameZeroReady = useCallback(() => {
    setIsClinicIdleMasked(true);
    clearClinicHappyTimers();

    // 1 full chibi-happy cycle is 30 frames * 65ms = 1950ms:
    // At 1885ms: reveal chibi-idle underneath at opacity 1 before unmounting chibi-happy
    clinicRevealIdleTimerRef.current = window.setTimeout(() => {
      setIsClinicIdleMasked(false);
      clinicRevealIdleTimerRef.current = null;
    }, 1885);

    // At 1940ms: unmount chibi-happy layer cleanly
    clinicHideHappyTimerRef.current = window.setTimeout(() => {
      setClinicHappyPlaySrc(null);
      clinicHideHappyTimerRef.current = null;
    }, 1940);
  }, [clearClinicHappyTimers]);

  const activeDialogueComboKey: 'choice0_0' | 'choice0_1' | 'choice1_0' | 'choice1_1' =
    firstChoiceIndex === 0
      ? batteryChoiceIndex === 0
        ? 'choice0_0'
        : 'choice0_1'
      : batteryChoiceIndex === 0
        ? 'choice1_0'
        : 'choice1_1';

  const activeClinicDialogueList =
    activeStep2Config.postCompleteDialogue[activeDialogueComboKey];

  const activeClinicDialogueLine =
    activeClinicDialogueList[batteryDialogueIdx] ?? activeClinicDialogueList[0];

  const canShowClinicSkip =
    clinicScanPhase === 'scanning' ||
    (clinicScanPhase === 'done' &&
      (clinicDialogueStep === 1 ||
        clinicDialogueStep === 2 ||
        clinicDialogueStep === 5 ||
        clinicDialogueStep === 6 ||
        clinicDialogueStep === 9 ||
        clinicDialogueStep === 10 ||
        clinicDialogueStep === 11 ||
        (clinicDialogueStep === 12 &&
          batteryDialogueIdx < activeClinicDialogueList.length - 1)));

  const handleClinicSkip = useCallback(() => {
    if (clinicScanPhase === 'scanning') {
      sound.playSelect();
      setClinicScanPhase('done');
      setClinicDialogueStep(1);
      return;
    }

    if (clinicScanPhase !== 'done') return;

    if (
      clinicDialogueStep === 1 ||
      clinicDialogueStep === 2 ||
      clinicDialogueStep === 3
    ) {
      sound.playSelect();
      setClinicDialogueStep(4);
    } else if (clinicDialogueStep === 5) {
      sound.playSelect();
      setIsChibiScanReady(false);
      setIsBatteryPreRevealed(false);
      setChibiScanPlaySrc(null);
      if (activeChibiScanUrlRef.current) {
        URL.revokeObjectURL(activeChibiScanUrlRef.current);
        activeChibiScanUrlRef.current = null;
      }
      setClinicDialogueStep(6);
    } else if (clinicDialogueStep === 6 || clinicDialogueStep === 7) {
      sound.playSelect();
      setClinicDialogueStep(8);
    } else if (clinicDialogueStep === 9) {
      sound.playSelect();
      setIsChibiScan2Ready(false);
      setIsIdlePreRevealed(false);
      setChibiScan2PlaySrc(null);
      if (activeChibiScan2UrlRef.current) {
        URL.revokeObjectURL(activeChibiScan2UrlRef.current);
        activeChibiScan2UrlRef.current = null;
      }
      setBatteryDialogueIdx(0);
      setClinicDialogueStep(10);
    } else if (clinicDialogueStep === 10 || clinicDialogueStep === 11) {
      sound.playSelect();
      clearClinicHappyTimers();
      setClinicHappyPlaySrc(null);
      if (activeClinicHappyUrlRef.current) {
        URL.revokeObjectURL(activeClinicHappyUrlRef.current);
        activeClinicHappyUrlRef.current = null;
      }
      setIsClinicIdleMasked(false);
      setBatteryDialogueIdx(0);
      setClinicDialogueStep(12);
    } else if (clinicDialogueStep === 12) {
      const lastIdx = Math.max(0, activeClinicDialogueList.length - 1);
      if (batteryDialogueIdx < lastIdx) {
        sound.playSelect();
        setBatteryDialogueIdx(lastIdx);
      }
    }
  }, [
    clinicScanPhase,
    clinicDialogueStep,
    batteryDialogueIdx,
    activeClinicDialogueList.length,
    clearClinicHappyTimers,
  ]);

  const backToHub = useCallback(() => {
    sound.playSelect();
    clearClinicHappyTimers();
    setClinicScanPhase('idle');
    setClinicDialogueStep(0);
    setBatteryChoiceIndex(0);
    setBatteryDialogueIdx(0);
    setIsChibiScanReady(false);
    setIsBatteryPreRevealed(false);
    setChibiScanPlaySrc(null);
    setIsChibiScan2Ready(false);
    setIsIdlePreRevealed(false);
    setChibiScan2PlaySrc(null);
    setClinicHappyPlaySrc(null);
    setIsClinicIdleMasked(false);
    setHoveredChapter(null);
    setTappedChapter(null);
    setChosenChapter(null);

    setCurrentPage((prev) => {
      const nextPage: GlitchtopiaPage = prev === 'restore-clinic' ? 'care-log' : 'hub';
      try {
        const targetUrl =
          GLITCHTOPIA_SLUG + window.location.search + window.location.hash;
        window.history.replaceState(
          { eventSlug: 'glitchtopia', glitchtopiaPage: nextPage },
          '',
          targetUrl
        );
      } catch {
        // Ignore history errors in restricted environments
      }
      return nextPage;
    });
  }, [clearClinicHappyTimers]);

  const handleChapterClick = (chapterNum: number) => {
    const isDesktop =
      typeof window !== 'undefined' &&
      window.matchMedia('(min-width: 1024px) and (hover: hover)').matches;

    if (isDesktop) {
      sound.playSuccess();
      setTappedChapter(chapterNum);
      setChosenChapter(chapterNum);
      return;
    }

    // On Phone / Tablet: 1st tap shifts card right & shows "-select.webp"; 2nd tap selects it
    if (tappedChapter !== chapterNum) {
      sound.playSelect();
      setTappedChapter(chapterNum);
      setChosenChapter(null);
    } else {
      sound.playSuccess();
      setChosenChapter(chapterNum);
    }
  };

  return (
    <div className="h-[100dvh] w-full overflow-hidden bg-[#07060f] text-[#e6e2f5] flex flex-col select-none">
      {/* Breadcrumb Navigation Bar: TSDT > SỰ KIỆN > GLITCHTOPIA */}
      <SiteHeader
        lang={lang}
        currentEventTitle="GLITCHTOPIA"
        currentEventSlug={GLITCHTOPIA_SLUG}
        onClickCurrentEvent={() => {
          if (currentPage !== 'hub') {
            backToHub();
          }
        }}
        onToggleLang={() => setLang((l) => (l === 'VI' ? 'EN' : 'VI'))}
      />

      {/* Glitchtopia Event Viewport */}
      <main className="glitchtopia-viewport">
        {/* Fast Cyberpunk Boot Loader while main background decodes */}
        {!isWallReady && (
          <div className="cyber-boot-overlay" aria-hidden="true">
            <div className="cyber-boot-indicator">
              <span className="cyber-boot-dot" />
              <span className="font-mono-tabular text-[11px] tracking-[0.22em] text-[#a79fc7] uppercase">
                GLITCHTOPIA // SYNCING
              </span>
            </div>
          </div>
        )}

        {/* Keep Hub stage mounted in memory so returning from Care Log / Memory Terminal is 0ms instant */}
        <div
          className={`glitchtopia-stage ${isWallReady ? 'is-ready' : 'is-loading'} ${
            currentPage !== 'hub' ? 'is-background-stage' : ''
          }`}
          aria-hidden={currentPage !== 'hub'}
        >
            {/* 1640x2360 Room Scene Canvas (locks room furniture, computer & chibi to background coordinates) */}
            <div className="glitchtopia-scene-canvas">
              {/* Hub Background Image */}
              <AssetImg
                remoteSrc={ASSETS.wall.remote}
                rawRemoteSrc={ASSETS.wall.rawRemote}
                localSrc={ASSETS.wall.local}
                alt="Glitchtopia Event Background"
                fetchPriority="high"
                onAssetReady={() => setIsWallReady(true)}
                className="glitchtopia-scene-wall"
              />

              {/* Left Sofa Interactive Robot Plant Pot (Cycles 3 Screen Expressions: 0 -> 1 -> 2 -> 0) */}
              <button
                type="button"
                aria-label="Touch Robot Plant Pot"
                onClick={handlePlantClick}
                className="glitchtopia-plant-btn"
              >
                <AssetImg
                  remoteSrc={ASSETS.plant.remote}
                  rawRemoteSrc={ASSETS.plant.rawRemote}
                  localSrc={ASSETS.plant.local}
                  alt="Robot Plant Pot"
                  className="glitchtopia-plant-img"
                />

                {/* Screen Face Overlay locked to the dark monitor region (835,1338 765x562 on 2048x2048) */}
                <svg
                  key={plantFaceIndex}
                  viewBox="0 0 200 146"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="glitchtopia-plant-face"
                  aria-hidden="true"
                >
                  <defs>
                    <filter
                      id="plantEyeGlow"
                      x="-25%"
                      y="-25%"
                      width="150%"
                      height="150%"
                      colorInterpolationFilters="sRGB"
                    >
                      <feGaussianBlur stdDeviation="2.0" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <clipPath id="leftBatteryClip">
                      <rect x="47" y="45" width="28" height="52" rx="6" />
                    </clipPath>
                    <clipPath id="rightBatteryClip">
                      <rect x="131" y="39" width="25" height="50" rx="5.5" />
                    </clipPath>
                  </defs>

                  {plantFaceIndex === 0 && (
                    <g filter="url(#plantEyeGlow)">
                      {/* Top-left subtle magenta glitch line matching Hình 1 */}
                      <rect
                        x="18"
                        y="22"
                        width="44"
                        height="3.2"
                        rx="1.6"
                        transform="rotate(-2 18 22)"
                        fill="#d946ef"
                        fillOpacity="0.88"
                      />

                      {/* Left Vertical Pixel Eye (3 stacked color bars + glowing cyan rim) */}
                      <g clipPath="url(#leftBatteryClip)">
                        <rect x="45" y="44" width="32" height="19" fill="#0d566e" />
                        <rect x="45" y="62" width="32" height="18" fill="#2799bd" />
                        <rect x="45" y="79" width="32" height="20" fill="#63e6fc" />
                      </g>
                      <rect
                        x="47"
                        y="45"
                        width="28"
                        height="52"
                        rx="6.5"
                        stroke="#a6f9ff"
                        strokeWidth="4.4"
                      />

                      {/* Right Vertical Pixel Eye (slightly higher & narrower in 3/4 perspective) */}
                      <g clipPath="url(#rightBatteryClip)">
                        <rect x="129" y="38" width="29" height="18" fill="#0d566e" />
                        <rect x="129" y="55" width="29" height="17" fill="#2799bd" />
                        <rect x="129" y="71" width="29" height="20" fill="#63e6fc" />
                      </g>
                      <rect
                        x="131"
                        y="39"
                        width="25"
                        height="50"
                        rx="6"
                        stroke="#a6f9ff"
                        strokeWidth="4.4"
                      />
                    </g>
                  )}

                  {plantFaceIndex === 1 && (
                    <g filter="url(#plantEyeGlow)">
                      {/* Left Horizontal Blinking Bar Eye matching Hình 2 */}
                      <rect
                        x="22"
                        y="69"
                        width="56"
                        height="13.5"
                        rx="6.75"
                        transform="rotate(-4.2 50 75)"
                        fill="#72f5ff"
                        stroke="#bdfbff"
                        strokeWidth="1.2"
                      />

                      {/* Right Horizontal Blinking Bar Eye matching Hình 2 */}
                      <rect
                        x="116"
                        y="61"
                        width="50"
                        height="13"
                        rx="6.5"
                        transform="rotate(-4.2 141 67)"
                        fill="#72f5ff"
                        stroke="#bdfbff"
                        strokeWidth="1.2"
                      />

                      {/* Bottom-right subtle mint-green glitch line matching Hình 2 */}
                      <rect
                        x="140"
                        y="117"
                        width="44"
                        height="3.4"
                        rx="1.7"
                        transform="rotate(-3 140 117)"
                        fill="#a7f3d0"
                        fillOpacity="0.92"
                      />
                    </g>
                  )}

                  {plantFaceIndex === 2 && (
                    <g filter="url(#plantEyeGlow)">
                      {/* Left Hollow Circle Eye matching Hình 3 */}
                      <ellipse
                        cx="56"
                        cy="74"
                        rx="23.5"
                        ry="24.5"
                        stroke="#6aefff"
                        strokeWidth="6.2"
                      />

                      {/* Bottom-left cute curved arc (◡) below left eye */}
                      <path
                        d="M 32 113 Q 42 124 52 112"
                        stroke="#6aefff"
                        strokeWidth="5.8"
                        strokeLinecap="round"
                        fill="none"
                      />

                      {/* Right Hollow Circle Eye matching Hình 3 */}
                      <ellipse
                        cx="151"
                        cy="68"
                        rx="20.5"
                        ry="23.5"
                        stroke="#6aefff"
                        strokeWidth="6"
                      />

                      {/* Top-right cute curved arc (◡) above right eye */}
                      <path
                        d="M 134 24 Q 144 35 154 23"
                        stroke="#6aefff"
                        strokeWidth="5.6"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </g>
                  )}
                </svg>
              </button>

              {/* Floating Spherical Drone Robot & 3 Holographic Ambient Bubbles */}
              <div className="glitchtopia-floating-robot-wrap" aria-hidden="false">
                {/* 3 Persistent Translucent Glass Bubbles around the robot (hidden while bursting) */}
                <span
                  className={`ambient-bubble ambient-bubble-1 ${
                    isRobotBursting ? 'is-bursting-hidden' : 'is-bursting-visible'
                  }`}
                  aria-hidden="true"
                >
                  <span className="bubble-highlight-top" />
                  <span className="bubble-highlight-bot" />
                </span>

                <span
                  className={`ambient-bubble ambient-bubble-2 ${
                    isRobotBursting ? 'is-bursting-hidden' : 'is-bursting-visible'
                  }`}
                  aria-hidden="true"
                >
                  <span className="bubble-highlight-top" />
                  <span className="bubble-highlight-bot" />
                </span>

                <span
                  className={`ambient-bubble ambient-bubble-3 ${
                    isRobotBursting ? 'is-bursting-hidden' : 'is-bursting-visible'
                  }`}
                  aria-hidden="true"
                >
                  <span className="bubble-highlight-top" />
                  <span className="bubble-highlight-bot" />
                </span>

                {/* Multiple Small Bubbles Bursting out from the robot (matching reference image) */}
                {isRobotBursting && (
                  <div key={robotBurstKey} className="robot-burst-layer" aria-hidden="true">
                    {ROBOT_BURST_BUBBLES.map((b) => (
                      <span
                        key={b.id}
                        className="robot-burst-bubble"
                        style={
                          {
                            width: `${b.size}px`,
                            height: `${b.size}px`,
                            '--target-x': `${b.dx}px`,
                            '--target-y': `${b.dy}px`,
                            '--anim-delay': `${b.delay}ms`,
                            '--anim-dur': `${b.dur}s`,
                          } as React.CSSProperties
                        }
                      >
                        <span className="bubble-highlight-top" />
                        <span className="bubble-highlight-bot" />
                      </span>
                    ))}
                  </div>
                )}

                {/* Spherical Robot Drone (Interactive button) */}
                <button
                  type="button"
                  aria-label="Touch Floating Drone Robot"
                  onClick={handleRobotClick}
                  className="glitchtopia-robot-drone"
                >
                  <AssetImg
                    remoteSrc={ASSETS.robot.remote}
                    rawRemoteSrc={ASSETS.robot.rawRemote}
                    localSrc={ASSETS.robot.local}
                    alt="Floating Spherical Drone Robot"
                    className="glitchtopia-robot-drone-img"
                  />
                  {/* Subtle inner eye glow effect */}
                  <span className="robot-eye-glow" aria-hidden="true" />
                </button>
              </div>

              {/* Right Shelf Interactive Hologram Computer Monitor (Cycles Skin 0 -> Skin 1 -> Skin 2 -> Skin 0) */}
              <div className="glitchtopia-computer-wrap">
                {COMPUTER_SKINS.map((skin, idx) => (
                  <AssetImg
                    key={skin.local}
                    remoteSrc={skin.remote}
                    rawRemoteSrc={skin.rawRemote}
                    localSrc={skin.local}
                    alt={`Hologram Computer Terminal Skin ${idx}`}
                    className={`glitchtopia-computer-img ${computerSkinIndex === idx ? 'is-active' : 'is-inactive'}`}
                  />
                ))}
                <button
                  type="button"
                  aria-label="Switch Hologram Computer Skin"
                  onClick={handleComputerClick}
                  className="glitchtopia-computer-click-area"
                />
              </div>

              {/* Center Interactive Chibi Character (Dual-layer Idle / Happy Animated WebP for Frame-0 zero-glitch playback) */}
              <div className="glitchtopia-chibi-hitbox">
                <AssetImg
                  remoteSrc={ASSETS.chibiIdle.remote}
                  rawRemoteSrc={ASSETS.chibiIdle.rawRemote}
                  localSrc={ASSETS.chibiIdle.local}
                  alt="Xavier Chibi"
                  className={`glitchtopia-chibi-img is-idle ${!isIdleMasked ? 'is-visible' : 'is-hidden'}`}
                />
                {happyPlaySrc && (
                  <img
                    key={happyPlayKey}
                    src={happyPlaySrc}
                    alt={`Xavier Chibi ${activeReactionPose}`}
                    draggable={false}
                    onLoad={handleHappyFrameZeroReady}
                    className={`glitchtopia-chibi-img is-${activeReactionPose} is-visible`}
                  />
                )}
                {/* Tight Silhouette Hitbox hugging only the Chibi's actual head, hair, torso, and boots */}
                <button
                  type="button"
                  aria-label="Touch Xavier Chibi"
                  onClick={handleChibiClick}
                  className="glitchtopia-chibi-click-area"
                />
              </div>

              {/* In-Game Speech Bubble matching reference screenshot */}
              {showSpeechBubble && (
                <div
                  className={`chibi-speech-bubble ${
                    speechSource !== 'chibi' ? 'is-plant-quote' : ''
                  }`}
                  role="status"
                  aria-live="polite"
                >
                  <svg
                    className="chibi-speech-svg"
                    viewBox="0 0 380 106"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="speechFillGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#121e2e" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="#0c1522" stopOpacity="0.97" />
                      </linearGradient>
                      <linearGradient id="speechOuterStroke" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#eef6ff" stopOpacity="0.95" />
                        <stop offset="45%" stopColor="#9ab6d1" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#e2effc" stopOpacity="0.92" />
                      </linearGradient>
                      <pattern
                        id="speechScanlines"
                        width="4"
                        height="4"
                        patternUnits="userSpaceOnUse"
                      >
                        <line
                          x1="0"
                          y1="0"
                          x2="4"
                          y2="0"
                          stroke="#5899c4"
                          strokeOpacity="0.1"
                          strokeWidth="1"
                        />
                      </pattern>
                    </defs>

                    {/* Main Capsule + Bottom-Left Tail Outer Metallic Shape */}
                    <path
                      d="M 46 6 H 334 A 40 40 0 0 1 374 46 V 50 A 40 40 0 0 1 334 90 H 54 L 30 102 L 37 87 A 40 40 0 0 1 6 50 V 46 A 40 40 0 0 1 46 6 Z"
                      fill="url(#speechFillGrad)"
                      stroke="url(#speechOuterStroke)"
                      strokeWidth="2.4"
                      strokeLinejoin="round"
                    />

                    {/* Subtle Scanline Overlay Inside Capsule */}
                    <path
                      d="M 46 6 H 334 A 40 40 0 0 1 374 46 V 50 A 40 40 0 0 1 334 90 H 54 L 30 102 L 37 87 A 40 40 0 0 1 6 50 V 46 A 40 40 0 0 1 46 6 Z"
                      fill="url(#speechScanlines)"
                    />

                    {/* Inner Subtle Rim Line matching Love and Deepspace bubble frame */}
                    <path
                      d="M 46 9.5 H 334 A 36.5 36.5 0 0 1 370.5 46 V 50 A 36.5 36.5 0 0 1 334 86.5 H 52.5 L 35.5 95.5 L 40.5 84.5 A 36.5 36.5 0 0 1 9.5 50 V 46 A 36.5 36.5 0 0 1 46 9.5 Z"
                      fill="none"
                      stroke="#5b7a99"
                      strokeOpacity="0.45"
                      strokeWidth="1.1"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <div className="chibi-speech-text">
                    {speechSource === 'plant' ? (
                      <>
                        <span>It&apos;ll never struggle to find</span>
                        <span>two matching leaves.</span>
                      </>
                    ) : speechSource === 'computer' ? (
                      <>
                        <span>The documentary was good</span>
                        <span>until the paywall.</span>
                      </>
                    ) : speechSource === 'robot' ? (
                      <>
                        <span>What if stars are bubbles</span>
                        <span>higher beings blow?</span>
                      </>
                    ) : (
                      <>
                        <span>Your warm hand just</span>
                        <span>saved the world again.</span>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Interactive Event HUD Overlay */}
            <div className="glitchtopia-hud-layer">
              {/* Top-Left Game Title Logo with Cyberpunk / Sci-Fi Hologram Effects */}
              <div className="glitchtopia-logo-wrap" aria-hidden="false">
                {/* Vertical left cyber signal line */}
                <span className="cyber-signal-line" aria-hidden="true" />

                {/* Floating cyber pixel particles */}
                <span className="cyber-pixel cyber-pixel-1" aria-hidden="true" />
                <span className="cyber-pixel cyber-pixel-2" aria-hidden="true" />
                <span className="cyber-pixel cyber-pixel-3" aria-hidden="true" />
                <span className="cyber-pixel cyber-pixel-4" aria-hidden="true" />
                <span className="cyber-pixel cyber-pixel-5" aria-hidden="true" />
                <span className="cyber-streak cyber-streak-1" aria-hidden="true" />
                <span className="cyber-streak cyber-streak-2" aria-hidden="true" />

                {/* Chromatic aberration / glitch slice ghost layers */}
                <AssetImg
                  remoteSrc={ASSETS.logo.remote}
                  rawRemoteSrc={ASSETS.logo.rawRemote}
                  localSrc={ASSETS.logo.local}
                  alt=""
                  aria-hidden="true"
                  className="glitchtopia-logo-ghost glitchtopia-logo-ghost-cyan"
                />
                <AssetImg
                  remoteSrc={ASSETS.logo.remote}
                  rawRemoteSrc={ASSETS.logo.rawRemote}
                  localSrc={ASSETS.logo.local}
                  alt=""
                  aria-hidden="true"
                  className="glitchtopia-logo-ghost glitchtopia-logo-ghost-magenta"
                />

                {/* Main Crisp Logo */}
                <AssetImg
                  remoteSrc={ASSETS.logo.remote}
                  rawRemoteSrc={ASSETS.logo.rawRemote}
                  localSrc={ASSETS.logo.local}
                  alt="Glitchtopia — Malfunction"
                  className="glitchtopia-logo-img"
                />

                {/* Bottom angled sci-fi neon data bar */}
                <span className="cyber-underline-bar" aria-hidden="true" />
              </div>

              {/* Right: Memory Terminal Button */}
              <button
                type="button"
                aria-label="Memory Terminal"
                onMouseEnter={() => sound.playHover()}
                onClick={openMemoryTerminal}
                className="glitchtopia-btn glitchtopia-btn-memory"
              >
                <AssetImg
                  remoteSrc={ASSETS.memoryTerminal.remote}
                  rawRemoteSrc={ASSETS.memoryTerminal.rawRemote}
                  localSrc={ASSETS.memoryTerminal.local}
                  alt="Memory Terminal"
                />
              </button>

              {/* Bottom-Left: Care Log Button */}
              <button
                type="button"
                aria-label="Care Log"
                onMouseEnter={() => sound.playHover()}
                onClick={openCareLog}
                className="glitchtopia-btn glitchtopia-btn-care"
              >
                <AssetImg
                  remoteSrc={ASSETS.careLog.remote}
                  rawRemoteSrc={ASSETS.careLog.rawRemote}
                  localSrc={ASSETS.careLog.local}
                  alt="Care Log"
                />
              </button>

              {/* Bottom Center-Left: Restore Clinic Button */}
              <button
                type="button"
                aria-label="Restore Clinic"
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playSelect()}
                className="glitchtopia-btn glitchtopia-btn-restore"
              >
                <AssetImg
                  remoteSrc={ASSETS.restoreClinic.remote}
                  rawRemoteSrc={ASSETS.restoreClinic.rawRemote}
                  localSrc={ASSETS.restoreClinic.local}
                  alt="Restore Clinic"
                />
              </button>

              {/* Bottom-Right: Defense Intercept Button */}
              <button
                type="button"
                aria-label="Defense Intercept"
                onMouseEnter={() => sound.playHover()}
                onClick={openDefenseIntercept}
                className="glitchtopia-btn glitchtopia-btn-defense"
              >
                <AssetImg
                  remoteSrc={ASSETS.defenseIntercept.remote}
                  rawRemoteSrc={ASSETS.defenseIntercept.rawRemote}
                  localSrc={ASSETS.defenseIntercept.local}
                  alt="Defense Intercept"
                />
              </button>
            </div>
          </div>

        {currentPage === 'care-log' && (
          <div className="glitchtopia-stage is-ready">
            {/* Coordinate-locked 1640x2360 Care Log Scene Canvas */}
            <div className="glitchtopia-scene-canvas is-care-log-canvas">
              <AssetImg
                remoteSrc={ASSETS.careLogWall.remote}
                rawRemoteSrc={ASSETS.careLogWall.rawRemote}
                localSrc={ASSETS.careLogWall.local}
                alt="Care Log Background"
                className="glitchtopia-scene-wall"
              />

              {/* Pixel-locked 1640x2360 Care Log Board Text & Cyber HUD Overlay (No Lock Icons) */}
              <svg
                className="care-log-board-svg"
                viewBox="0 0 1640 2360"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Care Log — Xavier Maintenance Status"
              >
                <defs>
                  <linearGradient id="careLogUnderlineGrad" x1="348" y1="609" x2="685" y2="609" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#8fe8ff" stopOpacity="0.65" />
                    <stop offset="55%" stopColor="#ff4d7d" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#8fe8ff" stopOpacity="0.15" />
                  </linearGradient>
                  <linearGradient id="careBoxBotGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4de4ff" stopOpacity="0" />
                    <stop offset="58%" stopColor="#4de4ff" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#72f2ff" stopOpacity="0.42" />
                  </linearGradient>
                  <linearGradient id="careBoxBotGlowActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6cecff" stopOpacity="0.06" />
                    <stop offset="50%" stopColor="#6cecff" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#9cf8ff" stopOpacity="0.62" />
                  </linearGradient>
                  <filter
                    id="careCyanGlow"
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="140%"
                    colorInterpolationFilters="sRGB"
                  >
                    <feGaussianBlur stdDeviation="2.6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <clipPath id="careLogTopHalf">
                    <rect x="590" y="540" width="115" height="47" />
                  </clipPath>
                  <clipPath id="careLogBottomHalf">
                    <rect x="590" y="587" width="115" height="35" />
                  </clipPath>
                  {/* 8-tooth cog mask with center hole + diagonal wrench handle separation gap */}
                  <mask id="careGearMask">
                    <rect x="-40" y="-40" width="80" height="80" fill="black" />
                    <g transform="rotate(-12)">
                      <rect x="-4.4" y="-25.5" width="8.8" height="51" rx="2" fill="white" />
                      <rect x="-4.4" y="-25.5" width="8.8" height="51" rx="2" transform="rotate(45)" fill="white" />
                      <rect x="-4.4" y="-25.5" width="8.8" height="51" rx="2" transform="rotate(90)" fill="white" />
                      <rect x="-4.4" y="-25.5" width="8.8" height="51" rx="2" transform="rotate(135)" fill="white" />
                      <circle cx="0" cy="0" r="19.5" fill="white" />
                    </g>
                    {/* Inner hole of gear */}
                    <circle cx="0" cy="0" r="12.2" fill="black" />
                    {/* Separation gap around the bottom-left wrench shaft */}
                    <g transform="rotate(-45)">
                      <rect x="-27" y="-5.8" width="24" height="11.6" rx="4" fill="black" />
                    </g>
                  </mask>
                  {/* Wrench head jaw cutout mask */}
                  <mask id="careWrenchMask">
                    <rect x="-40" y="-40" width="80" height="80" fill="white" />
                    <rect x="3.5" y="-3.5" width="14" height="7" rx="1.4" fill="black" />
                  </mask>
                </defs>

                {/* Top red-pink cyber accent line above "Care Log" */}
                <line
                  x1="396"
                  y1="528"
                  x2="668"
                  y2="528"
                  stroke="#ff4b7d"
                  strokeOpacity="0.42"
                  strokeWidth="1.8"
                />
                <rect
                  x="668"
                  y="525.5"
                  width="36"
                  height="5"
                  rx="1.5"
                  fill="#ff4b7d"
                  fillOpacity="0.9"
                />

                {/* Top-Left Corner Bracket ┌ */}
                <path
                  d="M 404 530 H 385 V 596"
                  stroke="#c8f6ff"
                  strokeWidth="3.2"
                  strokeLinecap="square"
                />

                {/* "Care" Title */}
                <text
                  x="404"
                  y="601"
                  fill="#f4f9ff"
                  fontFamily="'Playfair Display', 'Georgia', 'Times New Roman', serif"
                  fontSize="80"
                  fontWeight="700"
                  letterSpacing="0.01em"
                >
                  Care
                </text>

                {/* "Log" Title with authentic horizontal cyber glitch slice */}
                <g clipPath="url(#careLogTopHalf)">
                  <text
                    x="599"
                    y="601"
                    fill="#f4f9ff"
                    fontFamily="'Playfair Display', 'Georgia', 'Times New Roman', serif"
                    fontSize="50"
                    fontWeight="700"
                    letterSpacing="0.01em"
                  >
                    Log
                  </text>
                </g>
                <g clipPath="url(#careLogBottomHalf)">
                  <text
                    x="602.5"
                    y="601"
                    fill="#eaf6ff"
                    fontFamily="'Playfair Display', 'Georgia', 'Times New Roman', serif"
                    fontSize="50"
                    fontWeight="700"
                    letterSpacing="0.01em"
                  >
                    Log
                  </text>
                </g>
                {/* Subtle cyan glitch scanline across "Log" */}
                <rect
                  x="598"
                  y="586.2"
                  width="88"
                  height="1.6"
                  fill="#7ceeff"
                  fillOpacity="0.75"
                />

                {/* Bottom-Right Corner Bracket ┘ */}
                <path
                  d="M 706 566 V 615 H 688"
                  stroke="#d8f6ff"
                  strokeWidth="3.2"
                  strokeLinecap="square"
                />

                {/* Bottom horizontal underline below Care Log */}
                <line
                  x1="348"
                  y1="609"
                  x2="682"
                  y2="609"
                  stroke="url(#careLogUnderlineGrad)"
                  strokeWidth="1.8"
                />

                {/* Status Line 1: Extraterrestrial elements detected! */}
                <text
                  x="684"
                  y="783"
                  fill="#d9e7f5"
                  fontFamily="'Be Vietnam Pro', 'Segoe UI', sans-serif"
                  fontSize="24.5"
                  fontWeight="400"
                  letterSpacing="0.01em"
                >
                  Extraterrestrial elements detected!
                </text>

                {/* Micro-label ANDROID at top edge of cyan bar */}
                <text
                  x="842"
                  y="823"
                  fill="#567694"
                  fontFamily="'Be Vietnam Pro', 'Segoe UI', sans-serif"
                  fontSize="11"
                  fontWeight="600"
                  letterSpacing="0.06em"
                >
                  ANDROID
                </text>

                {/* Character Name: Xavier */}
                <text
                  x="705"
                  y="863"
                  fill="#eff7ff"
                  fontFamily="'Be Vietnam Pro', 'Segoe UI', sans-serif"
                  fontSize="37"
                  fontWeight="500"
                  letterSpacing="0.06em"
                >
                  Xavier
                </text>

                {/* Left Column: Maintenance Date + REPAIR DATE */}
                <text
                  x="684"
                  y="924"
                  fill="#d2e2f2"
                  fontFamily="'Be Vietnam Pro', 'Segoe UI', sans-serif"
                  fontSize="21.5"
                  fontWeight="400"
                  letterSpacing="0.01em"
                >
                  Maintenance Date
                </text>
                <text
                  x="685"
                  y="944"
                  fill="#4c6885"
                  fontFamily="'Be Vietnam Pro', 'Segoe UI', sans-serif"
                  fontSize="12"
                  fontWeight="500"
                  letterSpacing="0.14em"
                >
                  REPAIR DATE
                </text>

                {/* Right Column: Maintenance system running... */}
                <text
                  x="900"
                  y="919"
                  fill="#2ec2de"
                  fontFamily="'Be Vietnam Pro', 'Segoe UI', sans-serif"
                  fontSize="21.5"
                  fontWeight="400"
                  letterSpacing="0.01em"
                >
                  Maintenance system
                </text>
                <text
                  x="900"
                  y="946"
                  fill="#2ec2de"
                  fontFamily="'Be Vietnam Pro', 'Segoe UI', sans-serif"
                  fontSize="21.5"
                  fontWeight="400"
                  letterSpacing="0.01em"
                >
                  running...
                </text>

                {/* 6 Interactive Care Log Boxes (Log - 1 .. Log - 6) */}
                {[
                  { id: 1, label: 'Log - 1', x: 436, y: 1092 },
                  { id: 2, label: 'Log - 2', x: 844, y: 1092 },
                  { id: 3, label: 'Log - 3', x: 436, y: 1264 },
                  { id: 4, label: 'Log - 4', x: 844, y: 1264 },
                  { id: 5, label: 'Log - 5', x: 436, y: 1436 },
                  { id: 6, label: 'Log - 6', x: 844, y: 1436 },
                ].map((box) => {
                  const isActive = hoveredCareLog === box.id || selectedCareLog === box.id;
                  return (
                    <g
                      key={box.id}
                      transform={`translate(${box.x}, ${box.y})`}
                      className={`care-log-box-item ${isActive ? 'is-active' : ''}`}
                      role="button"
                      tabIndex={0}
                      aria-label={box.label}
                      onMouseEnter={() => {
                        sound.playHover();
                        setHoveredCareLog(box.id);
                      }}
                      onMouseLeave={() => {
                        if (hoveredCareLog === box.id) {
                          setHoveredCareLog(null);
                        }
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (box.id >= 1 && box.id <= 5) {
                          openRestoreClinic(box.id);
                        } else {
                          sound.playSelect();
                          setSelectedCareLog(box.id);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          if (box.id >= 1 && box.id <= 5) {
                            openRestoreClinic(box.id);
                          } else {
                            sound.playSelect();
                            setSelectedCareLog(box.id);
                          }
                        }
                      }}
                    >
                      {/* Full Box Click Hit Area */}
                      <path
                        d="M 0 0 H 359 V 134 H 14 L 0 120 Z"
                        fill="transparent"
                      />

                      {/* Bottom Upward Cyan Inner Glow matching unlocked Care Log box */}
                      <path
                        d="M 1 82 H 358 V 133 H 14.5 L 1 119.5 Z"
                        fill={isActive ? 'url(#careBoxBotGlowActive)' : 'url(#careBoxBotGlow)'}
                      />

                      {/* Glowing Cyan Bottom + Chamfer Border Line */}
                      <path
                        d="M 1 119.5 L 14.5 133 H 358"
                        stroke={isActive ? '#d6fcff' : '#95f3ff'}
                        strokeWidth={isActive ? '3.4' : '2.6'}
                        filter="url(#careCyanGlow)"
                      />

                      {/* Bottom-left cyber glitch bar + pixel block */}
                      <rect
                        x="22"
                        y="122"
                        width="54"
                        height="2.6"
                        rx="1.3"
                        fill="#bef8ff"
                        fillOpacity="0.88"
                      />
                      <rect
                        x="28"
                        y="117.5"
                        width="12"
                        height="3.2"
                        fill="#7ceeff"
                        fillOpacity="0.55"
                      />

                      {/* Top-right cyber glitch bars matching reference screenshot */}
                      <rect
                        x="306"
                        y="-1"
                        width="50"
                        height="2.8"
                        rx="1.4"
                        fill="#cbfaff"
                        fillOpacity="0.92"
                      />
                      <rect
                        x="294"
                        y="8.5"
                        width="44"
                        height="2.5"
                        rx="1.2"
                        fill="#8ff0ff"
                        fillOpacity="0.9"
                      />
                      <rect
                        x="326"
                        y="8.5"
                        width="38"
                        height="2.2"
                        rx="1.1"
                        fill="#a78bfa"
                        fillOpacity="0.78"
                      />
                      <rect
                        x="284"
                        y="14.5"
                        width="7"
                        height="2.2"
                        fill="#7ceeff"
                        fillOpacity="0.75"
                      />

                      {/* Left Gear + Wrench Icon (centered at x=87, y=68) */}
                      <g transform="translate(87, 68)">
                        {/* Outer faint blue-cyan HUD ring + segmented arc highlights */}
                        <circle
                          cx="0"
                          cy="0"
                          r="34"
                          stroke="#387da8"
                          strokeOpacity="0.55"
                          strokeWidth="1.8"
                        />
                        <path
                          d="M -24 -24 A 34 34 0 0 1 24 -24"
                          stroke="#66d4ff"
                          strokeOpacity="0.62"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 25 23 A 34 34 0 0 1 -14 31"
                          stroke="#66d4ff"
                          strokeOpacity="0.48"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />

                        {/* 8-tooth Cyan Gear + Diagonal Wrench */}
                        <g filter="url(#careCyanGlow)">
                          <rect
                            x="-30"
                            y="-30"
                            width="60"
                            height="60"
                            fill={isActive ? '#d8fbff' : '#b2f0ff'}
                            mask="url(#careGearMask)"
                          />
                          {/* Diagonal Open-End Wrench (-45deg) */}
                          <g transform="rotate(-45)" mask="url(#careWrenchMask)">
                            <rect
                              x="-24"
                              y="-3.3"
                              width="28"
                              height="6.6"
                              rx="3.3"
                              fill={isActive ? '#e0fcff' : '#bcf4ff'}
                            />
                            <circle
                              cx="6.2"
                              cy="0"
                              r="7.8"
                              fill={isActive ? '#e0fcff' : '#bcf4ff'}
                            />
                          </g>
                        </g>
                      </g>

                      {/* "Log - N" Label */}
                      <text
                        x="138"
                        y="78"
                        fill="#eef7ff"
                        fontFamily="'Be Vietnam Pro', 'Segoe UI', sans-serif"
                        fontSize="31"
                        fontWeight="600"
                        letterSpacing="0.02em"
                      >
                        {box.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Interactive HUD Layer with Top-Left Back Button */}
            <div className="glitchtopia-hud-layer">
              <button
                type="button"
                aria-label={lang === 'VI' ? 'Quay lại Glitchtopia' : 'Back to Glitchtopia'}
                title={lang === 'VI' ? 'Quay lại Glitchtopia' : 'Back to Glitchtopia'}
                onMouseEnter={() => sound.playHover()}
                onClick={(e) => {
                  e.stopPropagation();
                  backToHub();
                }}
                className="memory-terminal-back-btn"
              >
                <svg
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                >
                  <path
                    d="M18.5 5L14.2 9.3M11.6 11.9L9.5 14L18.5 23"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {currentPage === 'restore-clinic' &&
          selectedCareLog !== null &&
          selectedCareLog >= 1 &&
          selectedCareLog <= 5 && (
          <div
            className="glitchtopia-stage is-ready"
            onClick={() => {
              if (clinicDialogueStep === 1) {
                sound.playSelect();
                setClinicDialogueStep(2);
              } else if (clinicDialogueStep === 2) {
                sound.playSelect();
                setClinicDialogueStep(3);
              } else if (clinicDialogueStep === 6) {
                sound.playSelect();
                setClinicDialogueStep(7);
              } else if (clinicDialogueStep === 10) {
                triggerClinicCompleteStep();
              } else if (clinicDialogueStep === 11) {
                sound.playSelect();
                clearClinicHappyTimers();
                setClinicHappyPlaySrc(null);
                setIsClinicIdleMasked(false);
                setBatteryDialogueIdx(0);
                setClinicDialogueStep(12);
              } else if (clinicDialogueStep === 12) {
                if (batteryDialogueIdx < activeClinicDialogueList.length - 1) {
                  sound.playSelect();
                  setBatteryDialogueIdx((i) => i + 1);
                }
              }
            }}
          >
            {/* Coordinate-locked 1640x2360 Restore Clinic Scene Canvas */}
            <div className="glitchtopia-scene-canvas is-restore-clinic-canvas">
              <AssetImg
                remoteSrc={ASSETS.restoreClinicWall.remote}
                rawRemoteSrc={ASSETS.restoreClinicWall.rawRemote}
                localSrc={ASSETS.restoreClinicWall.local}
                alt="Restore Clinic Background"
                className={`glitchtopia-scene-wall is-restore-clinic-wall ${
                  clinicScanPhase !== 'idle' ? 'is-scan-dimmed' : ''
                } ${
                  (clinicDialogueStep >= 4 && clinicDialogueStep <= 6) ||
                  (clinicDialogueStep >= 8 && clinicDialogueStep <= 10)
                    ? 'is-focus-dimmed'
                    : ''
                }`}
              />

              {/* Restore Clinic Chibi Character: only mounts layers needed for the active selectedCareLog */}
              {clinicDialogueStep < 2 && (
                <AssetImg
                  remoteSrc={ASSETS.chibiCare.remote}
                  rawRemoteSrc={ASSETS.chibiCare.rawRemote}
                  localSrc={ASSETS.chibiCare.local}
                  alt="Xavier Chibi Restore Clinic"
                  className={`restore-clinic-chibi-img ${
                    clinicScanPhase === 'done' ? 'is-hidden' : 'is-visible'
                  }`}
                />
              )}
              {(selectedCareLog === 1 || selectedCareLog === 4) && clinicDialogueStep < 5 && (
                <AssetImg
                  remoteSrc={ASSETS.chibiEyeBattery.remote}
                  rawRemoteSrc={ASSETS.chibiEyeBattery.rawRemote}
                  localSrc={ASSETS.chibiEyeBattery.local}
                  alt="Xavier Chibi Eye Battery"
                  className={`restore-clinic-chibi-img ${
                    clinicScanPhase === 'done' && clinicDialogueStep < 4
                      ? 'is-visible'
                      : 'is-hidden'
                  }`}
                />
              )}
              {selectedCareLog === 2 && clinicDialogueStep <= 9 && (
                <AssetImg
                  remoteSrc={ASSETS.chibiStarTorn.remote}
                  rawRemoteSrc={ASSETS.chibiStarTorn.rawRemote}
                  localSrc={ASSETS.chibiStarTorn.local}
                  alt="Xavier Chibi Star Torn"
                  decoding="sync"
                  className={`restore-clinic-chibi-img ${
                    clinicDialogueStep >= 4 && clinicDialogueStep !== 7
                      ? 'is-zoomed-startorn'
                      : 'is-startorn'
                  } ${
                    clinicScanPhase === 'done' &&
                    (clinicDialogueStep < 4 ||
                      clinicDialogueStep === 4 ||
                      (clinicDialogueStep === 5 && (!isChibiScanReady || isBatteryPreRevealed)) ||
                      clinicDialogueStep === 6 ||
                      clinicDialogueStep === 7 ||
                      clinicDialogueStep === 8 ||
                      (clinicDialogueStep === 9 && !isChibiScan2Ready))
                      ? 'is-visible'
                      : 'is-hidden'
                  }`}
                />
              )}
              {(selectedCareLog === 3 || selectedCareLog === 5) && clinicDialogueStep < 5 && (
                <AssetImg
                  remoteSrc={ASSETS.chibiPlantPatch.remote}
                  rawRemoteSrc={ASSETS.chibiPlantPatch.rawRemote}
                  localSrc={ASSETS.chibiPlantPatch.local}
                  alt="Xavier Chibi Plant Patch"
                  decoding="sync"
                  className={`restore-clinic-chibi-img is-plantpatch ${
                    clinicScanPhase === 'done' && clinicDialogueStep < 4
                      ? 'is-visible'
                      : 'is-hidden'
                  }`}
                />
              )}
              {(selectedCareLog === 3 || selectedCareLog === 5) &&
                clinicScanPhase === 'done' &&
                clinicDialogueStep >= 3 &&
                clinicDialogueStep <= 5 && (
                  <AssetImg
                    remoteSrc={ASSETS.chibiPlant.remote}
                    rawRemoteSrc={ASSETS.chibiPlant.rawRemote}
                    localSrc={ASSETS.chibiPlant.local}
                    alt="Xavier Chibi Plant Close-up"
                    decoding="sync"
                    className={`restore-clinic-chibi-img is-zoomed-plantpatch ${
                      clinicDialogueStep === 4 || (clinicDialogueStep === 5 && !isChibiScanReady)
                        ? 'is-visible'
                        : 'is-hidden'
                    }`}
                  />
                )}
              {(selectedCareLog === 3 || selectedCareLog === 5) &&
                clinicScanPhase === 'done' &&
                clinicDialogueStep >= 5 &&
                clinicDialogueStep <= 9 && (
                  <AssetImg
                    remoteSrc={ASSETS.chibiPatch.remote}
                    rawRemoteSrc={ASSETS.chibiPatch.rawRemote}
                    localSrc={ASSETS.chibiPatch.local}
                    alt="Xavier Chibi Patch"
                    decoding="sync"
                    className={`restore-clinic-chibi-img ${
                      clinicDialogueStep !== 7 ? 'is-zoomed-plantpatch' : 'is-plantpatch'
                    } ${
                      (clinicDialogueStep === 5 && isBatteryPreRevealed) ||
                      clinicDialogueStep === 6 ||
                      clinicDialogueStep === 7 ||
                      clinicDialogueStep === 8 ||
                      (clinicDialogueStep === 9 && !isChibiScan2Ready)
                        ? 'is-visible'
                        : 'is-hidden'
                    }`}
                  />
                )}
              {(selectedCareLog === 1 || selectedCareLog === 4) &&
                clinicScanPhase === 'done' &&
                clinicDialogueStep >= 3 &&
                clinicDialogueStep <= 5 && (
                  <AssetImg
                    remoteSrc={ASSETS.chibiEye.remote}
                    rawRemoteSrc={ASSETS.chibiEye.rawRemote}
                    localSrc={ASSETS.chibiEye.local}
                    alt="Xavier Chibi Eye Close-up"
                    decoding="sync"
                    className={`restore-clinic-chibi-img is-zoomed-eye ${
                      clinicDialogueStep === 4 || (clinicDialogueStep === 5 && !isChibiScanReady)
                        ? 'is-visible'
                        : 'is-hidden'
                    }`}
                  />
                )}
              {(selectedCareLog === 1 || selectedCareLog === 4) &&
                clinicScanPhase === 'done' &&
                clinicDialogueStep >= 5 &&
                clinicDialogueStep <= 9 && (
                  <AssetImg
                    remoteSrc={ASSETS.chibiBattery.remote}
                    rawRemoteSrc={ASSETS.chibiBattery.rawRemote}
                    localSrc={ASSETS.chibiBattery.local}
                    alt="Xavier Chibi Battery"
                    decoding="sync"
                    className={`restore-clinic-chibi-img ${
                      clinicDialogueStep !== 7 ? 'is-zoomed-eye' : ''
                    } ${
                      (clinicDialogueStep === 5 && isBatteryPreRevealed) ||
                      clinicDialogueStep === 6 ||
                      clinicDialogueStep === 7 ||
                      clinicDialogueStep === 8 ||
                      (clinicDialogueStep === 9 && !isChibiScan2Ready)
                        ? 'is-visible'
                        : 'is-hidden'
                    }`}
                  />
                )}
              {clinicScanPhase === 'done' && clinicDialogueStep >= 9 && (
                <AssetImg
                  remoteSrc={ASSETS.chibiIdle.remote}
                  rawRemoteSrc={ASSETS.chibiIdle.rawRemote}
                  localSrc={ASSETS.chibiIdle.local}
                  alt="Xavier Chibi Idle"
                  decoding="sync"
                  className={`restore-clinic-chibi-img ${
                    clinicDialogueStep >= 11 ? 'is-normal-idle' : 'is-zoomed-idle'
                  } ${
                    (clinicDialogueStep === 9 && isIdlePreRevealed) ||
                    clinicDialogueStep === 10 ||
                    (clinicDialogueStep === 11 && !isClinicIdleMasked) ||
                    clinicDialogueStep === 12
                      ? 'is-visible'
                      : 'is-hidden'
                  }`}
                />
              )}
              {clinicScanPhase === 'done' &&
                clinicDialogueStep === 11 &&
                clinicHappyPlaySrc && (
                  <img
                    src={clinicHappyPlaySrc}
                    alt="Xavier Chibi Happy Complete"
                    decoding="sync"
                    draggable={false}
                    onLoad={(e) => {
                      const img = e.currentTarget;
                      if (typeof img.decode === 'function') {
                        img
                          .decode()
                          .then(handleClinicHappyFrameZeroReady)
                          .catch(handleClinicHappyFrameZeroReady);
                      } else {
                        handleClinicHappyFrameZeroReady();
                      }
                    }}
                    onError={() => {
                      if (clinicHappyPlaySrc !== ASSETS.chibiHappy.remote) {
                        setClinicHappyPlaySrc(ASSETS.chibiHappy.remote);
                      } else {
                        handleClinicHappyFrameZeroReady();
                      }
                    }}
                    className="restore-clinic-chibi-img is-normal-happy is-visible"
                  />
                )}
              {clinicScanPhase === 'done' && clinicDialogueStep === 5 && chibiScanPlaySrc && (
                <img
                  src={chibiScanPlaySrc}
                  alt="Xavier Chibi Scan Repair"
                  decoding="sync"
                  draggable={false}
                  onLoad={(e) => {
                    const img = e.currentTarget;
                    const markReady = () => {
                      window.requestAnimationFrame(() => setIsChibiScanReady(true));
                    };
                    if (typeof img.decode === 'function') {
                      img.decode().then(markReady).catch(markReady);
                    } else {
                      markReady();
                    }
                  }}
                  onError={() => {
                    if (chibiScanPlaySrc !== ASSETS.chibiScan.remote) {
                      setChibiScanPlaySrc(ASSETS.chibiScan.remote);
                    } else {
                      setIsChibiScanReady(true);
                    }
                  }}
                  className={`restore-clinic-chibi-img is-zoomed-scan ${
                    clinicDialogueStep === 5 && isChibiScanReady ? 'is-visible' : 'is-hidden'
                  }`}
                />
              )}
              {clinicScanPhase === 'done' && clinicDialogueStep === 9 && chibiScan2PlaySrc && (
                <img
                  src={chibiScan2PlaySrc}
                  alt="Xavier Chibi Scan Heart"
                  decoding="sync"
                  draggable={false}
                  onLoad={(e) => {
                    const img = e.currentTarget;
                    const markReady = () => {
                      window.requestAnimationFrame(() => setIsChibiScan2Ready(true));
                    };
                    if (typeof img.decode === 'function') {
                      img.decode().then(markReady).catch(markReady);
                    } else {
                      markReady();
                    }
                  }}
                  onError={() => {
                    if (chibiScan2PlaySrc !== ASSETS.chibiScan2.remote) {
                      setChibiScan2PlaySrc(ASSETS.chibiScan2.remote);
                    } else {
                      setIsChibiScan2Ready(true);
                    }
                  }}
                  className={`restore-clinic-chibi-img is-zoomed-scan2 ${
                    clinicDialogueStep === 9 && isChibiScan2Ready ? 'is-visible' : 'is-hidden'
                  }`}
                />
              )}

              {/* Scanning Laser Beam Overlay with Cyberpunk Glitch, Hologram Trail & HUD Telemetry */}
              {clinicScanPhase === 'scanning' && (
                <div
                  className="restore-clinic-scanning-beam"
                  onAnimationEnd={(e) => {
                    if (e.animationName === 'restore-clinic-scan-sweep') {
                      setClinicScanPhase('done');
                      setClinicDialogueStep(1);
                    }
                  }}
                >
                  {/* Trailing Digital Grid & Scanline Light Curtain above beam */}
                  <div className="scan-cyber-trail" aria-hidden="true" />

                  {/* Intense Neon Laser Horizon Line */}
                  <div className="scan-cyber-laser-line" aria-hidden="true" />

                  {/* Chromatic Aberration Glitch Ghost Layers (Cyan & Magenta) */}
                  <AssetImg
                    remoteSrc={ASSETS.scanning.remote}
                    rawRemoteSrc={ASSETS.scanning.rawRemote}
                    localSrc={ASSETS.scanning.local}
                    alt=""
                    aria-hidden="true"
                    className="scan-cyber-img scan-cyber-ghost-cyan"
                  />
                  <AssetImg
                    remoteSrc={ASSETS.scanning.remote}
                    rawRemoteSrc={ASSETS.scanning.rawRemote}
                    localSrc={ASSETS.scanning.local}
                    alt=""
                    aria-hidden="true"
                    className="scan-cyber-img scan-cyber-ghost-magenta"
                  />

                  {/* Main Scanning Beam Image with Neon Pulse */}
                  <AssetImg
                    remoteSrc={ASSETS.scanning.remote}
                    rawRemoteSrc={ASSETS.scanning.rawRemote}
                    localSrc={ASSETS.scanning.local}
                    alt="Scanning..."
                    className="scan-cyber-img scan-cyber-main"
                  />

                  {/* Left & Right Cyberpunk HUD Reticles, Glitch Streaks & Floating Data Pixels */}
                  <span className="scan-cyber-bracket scan-cyber-bracket-left" aria-hidden="true" />
                  <span className="scan-cyber-bracket scan-cyber-bracket-right" aria-hidden="true" />
                  <span className="scan-cyber-tag scan-cyber-tag-left" aria-hidden="true">
                    SYS.SCAN // 0x9F
                  </span>
                  <span className="scan-cyber-tag scan-cyber-tag-right" aria-hidden="true">
                    BIO-SYNC
                  </span>
                  <span className="scan-cyber-spark scan-cyber-spark-1" aria-hidden="true" />
                  <span className="scan-cyber-spark scan-cyber-spark-2" aria-hidden="true" />
                  <span className="scan-cyber-spark scan-cyber-spark-3" aria-hidden="true" />
                  <span className="scan-cyber-spark scan-cyber-spark-4" aria-hidden="true" />
                </div>
              )}

              {/* Step 11: Top-Center Holographic "+ Complete! +" Banner matching image_67df016a.png */}
              {clinicDialogueStep === 11 && (
                <div className="restore-clinic-complete-banner" aria-hidden="true">
                  <svg
                    viewBox="0 0 760 150"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="restore-clinic-complete-svg"
                  >
                    <defs>
                      <linearGradient id="completeBandGrad" x1="0" y1="0.5" x2="1" y2="0.5">
                        <stop offset="0%" stopColor="#1e4b8f" stopOpacity="0" />
                        <stop offset="18%" stopColor="#2664b8" stopOpacity="0.45" />
                        <stop offset="50%" stopColor="#388ce0" stopOpacity="0.72" />
                        <stop offset="82%" stopColor="#2664b8" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#1e4b8f" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="completeEdgeLineGrad" x1="0" y1="0.5" x2="1" y2="0.5">
                        <stop offset="0%" stopColor="#7ceeff" stopOpacity="0" />
                        <stop offset="22%" stopColor="#7ceeff" stopOpacity="0.55" />
                        <stop offset="50%" stopColor="#d8fcff" stopOpacity="0.92" />
                        <stop offset="78%" stopColor="#7ceeff" stopOpacity="0.55" />
                        <stop offset="100%" stopColor="#7ceeff" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="completeTextGrad" x1="0" y1="0" x2="1" y2="0.2">
                        <stop offset="0%" stopColor="#fff7d6" />
                        <stop offset="35%" stopColor="#f3f9e8" />
                        <stop offset="70%" stopColor="#d9f7ff" />
                        <stop offset="100%" stopColor="#8cecff" />
                      </linearGradient>
                      <filter
                        id="completeTextGlow"
                        x="-25%"
                        y="-35%"
                        width="150%"
                        height="170%"
                        colorInterpolationFilters="sRGB"
                      >
                        <feGaussianBlur stdDeviation="5" result="blur1" />
                        <feColorMatrix
                          in="blur1"
                          type="matrix"
                          values="0 0 0 0 0.25  0 0 0 0 0.85  0 0 0 0 1  0 0 0 0.85 0"
                          result="cyanGlow"
                        />
                        <feMerge>
                          <feMergeNode in="cyanGlow" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Soft Horizontal Hologram Band */}
                    <rect x="20" y="36" width="720" height="78" fill="url(#completeBandGrad)" />

                    {/* Top & Bottom Glowing Wave Hairlines */}
                    <path
                      d="M 40 36 Q 210 22 380 34 T 720 36"
                      stroke="url(#completeEdgeLineGrad)"
                      strokeWidth="1.6"
                      fill="none"
                    />
                    <path
                      d="M 40 114 Q 210 124 380 114 T 720 114"
                      stroke="url(#completeEdgeLineGrad)"
                      strokeWidth="1.8"
                      fill="none"
                    />

                    {/* Subtle Center Upward Arrow Silhouette behind text */}
                    <path
                      d="M 380 28 L 414 62 H 394 V 108 H 366 V 62 H 346 Z"
                      fill="#7ceeff"
                      fillOpacity="0.16"
                    />

                    {/* Vertical Micro Tech Tick Lines on Left & Right */}
                    {[168, 180, 192, 568, 580, 592].map((tx, idx) => (
                      <line
                        key={tx}
                        x1={tx}
                        y1={idx % 2 === 0 ? 22 : 28}
                        x2={tx}
                        y2={122}
                        stroke="#8cecff"
                        strokeOpacity="0.24"
                        strokeWidth="1.4"
                      />
                    ))}

                    {/* Floating Data Squares */}
                    <rect x="64" y="64" width="12" height="12" fill="#9bc5ef" fillOpacity="0.35" />
                    <rect x="298" y="10" width="13" height="13" fill="#e2ecf8" fillOpacity="0.55" />

                    {/* Left Glowing Cyan Medical Cross (+) */}
                    <g transform="translate(206, 78)" filter="url(#completeTextGlow)">
                      <rect x="-4.5" y="-14" width="9" height="28" rx="1.5" fill="#7cf3ff" />
                      <rect x="-14" y="-4.5" width="28" height="9" rx="1.5" fill="#7cf3ff" />
                    </g>

                    {/* Right Glowing Cyan Medical Cross (+) */}
                    <g transform="translate(554, 78)" filter="url(#completeTextGlow)">
                      <rect x="-4.5" y="-14" width="9" height="28" rx="1.5" fill="#7cf3ff" />
                      <rect x="-14" y="-4.5" width="28" height="9" rx="1.5" fill="#7cf3ff" />
                    </g>

                    {/* Main "Complete!" Serif Display Title */}
                    <text
                      x="380"
                      y="97"
                      textAnchor="middle"
                      fill="url(#completeTextGrad)"
                      fontFamily="'Playfair Display', 'Georgia', 'Times New Roman', serif"
                      fontSize="64"
                      fontWeight="700"
                      letterSpacing="0.02em"
                      filter="url(#completeTextGlow)"
                    >
                      {FIXED_CLINIC_DIALOGUE.completeBannerText}
                    </text>
                  </svg>
                </div>
              )}

              {/* Step 1, Step 11 & Step 12 (when speaker === 'X'): Top Blue Speech Bubble above full-body chibi */}
              {(clinicDialogueStep === 1 ||
                clinicDialogueStep === 11 ||
                (clinicDialogueStep === 12 &&
                  activeClinicDialogueLine?.speaker === 'X')) && (
                <div
                  key={
                    clinicDialogueStep === 12
                      ? `step12-x-${batteryDialogueIdx}`
                      : `step-${clinicDialogueStep}`
                  }
                  className={`chibi-speech-bubble is-clinic-quote${
                    clinicDialogueStep === 12 ? ' is-post-complete-quote' : ''
                  }${
                    clinicDialogueStep === 12 &&
                    (activeClinicDialogueLine?.lines.length ?? 0) >= 3
                      ? ' is-three-lines'
                      : ''
                  }`}
                  role="status"
                  aria-live="polite"
                >
                  <svg
                    className="chibi-speech-svg"
                    viewBox="0 0 380 106"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="clinicSpeechFillGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#121e2e" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="#0c1522" stopOpacity="0.97" />
                      </linearGradient>
                      <linearGradient id="clinicSpeechOuterStroke" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#eef6ff" stopOpacity="0.95" />
                        <stop offset="45%" stopColor="#9ab6d1" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#e2effc" stopOpacity="0.92" />
                      </linearGradient>
                      <pattern
                        id="clinicSpeechScanlines"
                        width="4"
                        height="4"
                        patternUnits="userSpaceOnUse"
                      >
                        <line
                          x1="0"
                          y1="0"
                          x2="4"
                          y2="0"
                          stroke="#5899c4"
                          strokeOpacity="0.1"
                          strokeWidth="1"
                        />
                      </pattern>
                    </defs>

                    <path
                      d="M 46 6 H 334 A 40 40 0 0 1 374 46 V 50 A 40 40 0 0 1 334 90 H 54 L 30 102 L 37 87 A 40 40 0 0 1 6 50 V 46 A 40 40 0 0 1 46 6 Z"
                      fill="url(#clinicSpeechFillGrad)"
                      stroke="url(#clinicSpeechOuterStroke)"
                      strokeWidth="2.4"
                      strokeLinejoin="round"
                    />

                    <path
                      d="M 46 6 H 334 A 40 40 0 0 1 374 46 V 50 A 40 40 0 0 1 334 90 H 54 L 30 102 L 37 87 A 40 40 0 0 1 6 50 V 46 A 40 40 0 0 1 46 6 Z"
                      fill="url(#clinicSpeechScanlines)"
                    />

                    <path
                      d="M 46 9.5 H 334 A 36.5 36.5 0 0 1 370.5 46 V 50 A 36.5 36.5 0 0 1 334 86.5 H 52.5 L 35.5 95.5 L 40.5 84.5 A 36.5 36.5 0 0 1 9.5 50 V 46 A 36.5 36.5 0 0 1 46 9.5 Z"
                      fill="none"
                      stroke="#5b7a99"
                      strokeOpacity="0.45"
                      strokeWidth="1.1"
                      strokeLinejoin="round"
                    />

                    {(clinicDialogueStep === 11 || clinicDialogueStep === 12) && (
                      <polygon points="338,73 347,73 342.5,80" fill="#d8ecff" fillOpacity="0.9" />
                    )}
                  </svg>

                  <div
                    className={`chibi-speech-text${
                      clinicDialogueStep === 12 ? ' is-clinic-zoomed-text' : ''
                    }`}
                  >
                    {clinicDialogueStep === 12 ? (
                      (activeClinicDialogueLine?.lines ?? []).map((line, i) => (
                        <span key={i}>{line}</span>
                      ))
                    ) : clinicDialogueStep === 11 ? (
                      FIXED_CLINIC_DIALOGUE.completeQuoteLines.map((line, i) => (
                        <span key={i}>{line}</span>
                      ))
                    ) : (
                      FIXED_CLINIC_DIALOGUE.afterInitialScanX.map((line, i) => (
                        <span key={i}>{line}</span>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Step 6 & Step 10: Top Speech Bubble after chibi-scan / chibi-scan2 finishes 1 cycle */}
              {(clinicDialogueStep === 6 || clinicDialogueStep === 10) && (() => {
                const zoomedQuoteLines =
                  clinicDialogueStep === 10
                    ? batteryChoiceIndex === 0
                      ? activeStep2Config.afterScanQuotes.choice0
                      : activeStep2Config.afterScanQuotes.choice1
                    : firstChoiceIndex === 0
                      ? activeStep1Config.afterScanQuotes.choice0
                      : activeStep1Config.afterScanQuotes.choice1;
                return (
                <div
                  key={`step-zoomed-${clinicDialogueStep}`}
                  className={`chibi-speech-bubble is-clinic-zoomed-quote${
                    zoomedQuoteLines.length >= 3 ? ' is-three-lines' : ''
                  }`}
                  role="status"
                  aria-live="polite"
                >
                  <svg
                    className="chibi-speech-svg"
                    viewBox="0 0 380 106"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="clinicZoomedSpeechFillGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#121e2e" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="#0c1522" stopOpacity="0.97" />
                      </linearGradient>
                      <linearGradient id="clinicZoomedSpeechOuterStroke" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#eef6ff" stopOpacity="0.95" />
                        <stop offset="45%" stopColor="#9ab6d1" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#e2effc" stopOpacity="0.92" />
                      </linearGradient>
                      <pattern
                        id="clinicZoomedSpeechScanlines"
                        width="4"
                        height="4"
                        patternUnits="userSpaceOnUse"
                      >
                        <line
                          x1="0"
                          y1="0"
                          x2="4"
                          y2="0"
                          stroke="#5899c4"
                          strokeOpacity="0.1"
                          strokeWidth="1"
                        />
                      </pattern>
                    </defs>

                    <path
                      d="M 46 6 H 334 A 40 40 0 0 1 374 46 V 50 A 40 40 0 0 1 334 90 H 54 L 30 102 L 37 87 A 40 40 0 0 1 6 50 V 46 A 40 40 0 0 1 46 6 Z"
                      fill="url(#clinicZoomedSpeechFillGrad)"
                      stroke="url(#clinicZoomedSpeechOuterStroke)"
                      strokeWidth="2.4"
                      strokeLinejoin="round"
                    />

                    <path
                      d="M 46 6 H 334 A 40 40 0 0 1 374 46 V 50 A 40 40 0 0 1 334 90 H 54 L 30 102 L 37 87 A 40 40 0 0 1 6 50 V 46 A 40 40 0 0 1 46 6 Z"
                      fill="url(#clinicZoomedSpeechScanlines)"
                    />

                    <path
                      d="M 46 9.5 H 334 A 36.5 36.5 0 0 1 370.5 46 V 50 A 36.5 36.5 0 0 1 334 86.5 H 52.5 L 35.5 95.5 L 40.5 84.5 A 36.5 36.5 0 0 1 9.5 50 V 46 A 36.5 36.5 0 0 1 46 9.5 Z"
                      fill="none"
                      stroke="#5b7a99"
                      strokeOpacity="0.45"
                      strokeWidth="1.1"
                      strokeLinejoin="round"
                    />

                    {clinicDialogueStep === 10 && (
                      <polygon points="338,73 347,73 342.5,80" fill="#d8ecff" fillOpacity="0.9" />
                    )}
                  </svg>

                  <div className="chibi-speech-text is-clinic-zoomed-text">
                    {zoomedQuoteLines.map((line, i) => (
                      <span key={i}>{line}</span>
                    ))}
                  </div>
                </div>
                );
              })()}

              {/* Step 2 & Step 12 (when speaker === 'MC'): Lower-Right Red/Burgundy Caretaker Speech Bubble */}
              {(clinicDialogueStep === 2 ||
                (clinicDialogueStep === 12 &&
                  activeClinicDialogueLine?.speaker === 'MC')) && (
                <div
                  key={
                    clinicDialogueStep === 12
                      ? `step12-mc-${batteryDialogueIdx}`
                      : `step-${clinicDialogueStep}`
                  }
                  className={`chibi-speech-bubble is-caretaker-red-quote${
                    clinicDialogueStep === 12 ? ' is-zoomed-caretaker-red-quote' : ''
                  }${
                    clinicDialogueStep === 12 &&
                    (activeClinicDialogueLine?.lines.length ?? 0) >= 3
                      ? ' is-three-lines'
                      : ''
                  }`}
                  role="status"
                  aria-live="polite"
                >
                  <svg
                    className="chibi-speech-svg"
                    viewBox="0 0 380 106"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="caretakerRedFillGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#581b30" stopOpacity="0.94" />
                        <stop offset="100%" stopColor="#72233d" stopOpacity="0.96" />
                      </linearGradient>
                      <linearGradient id="caretakerRedOuterStroke" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#f5dfe6" stopOpacity="0.95" />
                        <stop offset="50%" stopColor="#d39eb0" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#f5dfe6" stopOpacity="0.95" />
                      </linearGradient>
                      <pattern
                        id="caretakerRedScanlines"
                        width="4"
                        height="4"
                        patternUnits="userSpaceOnUse"
                      >
                        <line
                          x1="0"
                          y1="0"
                          x2="4"
                          y2="0"
                          stroke="#c86482"
                          strokeOpacity="0.12"
                          strokeWidth="1"
                        />
                      </pattern>
                    </defs>

                    {/* Main Capsule + Bottom-Right Tail Outer Metallic Shape */}
                    <path
                      d="M 46 6 H 334 A 40 40 0 0 1 374 46 V 50 A 40 40 0 0 1 343 87 L 352 101 L 326 90 H 46 A 40 40 0 0 1 6 50 V 46 A 40 40 0 0 1 46 6 Z"
                      fill="url(#caretakerRedFillGrad)"
                      stroke="url(#caretakerRedOuterStroke)"
                      strokeWidth="2.4"
                      strokeLinejoin="round"
                    />

                    {/* Subtle Scanline Overlay Inside Capsule */}
                    <path
                      d="M 46 6 H 334 A 40 40 0 0 1 374 46 V 50 A 40 40 0 0 1 343 87 L 352 101 L 326 90 H 46 A 40 40 0 0 1 6 50 V 46 A 40 40 0 0 1 46 6 Z"
                      fill="url(#caretakerRedScanlines)"
                    />

                    {/* Inner Subtle Rim Line */}
                    <path
                      d="M 46 9.5 H 334 A 36.5 36.5 0 0 1 370.5 46 V 50 A 36.5 36.5 0 0 1 339.5 84.5 L 344.5 94.5 L 327.5 86.5 H 46 A 36.5 36.5 0 0 1 9.5 50 V 46 A 36.5 36.5 0 0 1 46 9.5 Z"
                      fill="none"
                      stroke="#b36880"
                      strokeOpacity="0.52"
                      strokeWidth="1.1"
                      strokeLinejoin="round"
                    />

                    {/* Small downward indicator triangle at bottom-right matching reference screenshot */}
                    <polygon
                      points="333,73 343,73 338,80"
                      fill="#f6e7ec"
                      fillOpacity="0.95"
                    />
                  </svg>

                  <div className="chibi-speech-text is-caretaker-red-text">
                    {clinicDialogueStep === 12 ? (
                      (activeClinicDialogueLine?.lines ?? []).map((line, i) => (
                        <span key={i}>{line}</span>
                      ))
                    ) : (
                      FIXED_CLINIC_DIALOGUE.afterInitialScanMC.map((line, i) => (
                        <span key={i}>{line}</span>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Step 3 & Step 7: Top-Center Blue Holographic Diagnostic Checklist Panel */}
              {(clinicDialogueStep === 3 || clinicDialogueStep === 7) && (
                <div
                  className="diagnostic-checklist-panel"
                  role="region"
                  aria-label={DIAGNOSTIC_CHECKLIST_TEXT.title}
                >
                  <svg
                    className="diagnostic-checklist-bg-svg"
                    viewBox="0 0 520 436"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <defs>
                      <linearGradient id="diagPanelGrad" x1="0" y1="0" x2="0.15" y2="1">
                        <stop offset="0%" stopColor="#3558a8" stopOpacity="0.86" />
                        <stop offset="22%" stopColor="#1b439c" stopOpacity="0.90" />
                        <stop offset="72%" stopColor="#133b94" stopOpacity="0.93" />
                        <stop offset="92%" stopColor="#1c68b8" stopOpacity="0.94" />
                        <stop offset="100%" stopColor="#3bbce8" stopOpacity="0.95" />
                      </linearGradient>
                      <radialGradient id="diagTopLeftFrost" cx="0.08" cy="0.06" r="0.55">
                        <stop offset="0%" stopColor="#b8dcff" stopOpacity="0.42" />
                        <stop offset="50%" stopColor="#6ea4e8" stopOpacity="0.14" />
                        <stop offset="100%" stopColor="#1b439c" stopOpacity="0" />
                      </radialGradient>
                      <pattern
                        id="diagDotGrid"
                        width="8"
                        height="8"
                        patternUnits="userSpaceOnUse"
                      >
                        <circle cx="2" cy="2" r="0.85" fill="#7ce8ff" fillOpacity="0.12" />
                      </pattern>
                      <filter
                        id="diagTextGlow"
                        x="-15%"
                        y="-15%"
                        width="130%"
                        height="130%"
                        colorInterpolationFilters="sRGB"
                      >
                        <feDropShadow
                          dx="0"
                          dy="1.5"
                          stdDeviation="2.5"
                          floodColor="#07194a"
                          floodOpacity="0.7"
                        />
                      </filter>
                    </defs>

                    {/* Main Holographic Blue Screen Fill */}
                    <rect
                      x="14"
                      y="10"
                      width="486"
                      height="412"
                      rx="3"
                      fill="url(#diagPanelGrad)"
                    />
                    <rect
                      x="14"
                      y="10"
                      width="486"
                      height="412"
                      rx="3"
                      fill="url(#diagTopLeftFrost)"
                    />
                    <rect
                      x="14"
                      y="10"
                      width="486"
                      height="412"
                      rx="3"
                      fill="url(#diagDotGrid)"
                    />

                    {/* Subtle DNA / Wave Dotted Curve in Bottom-Right Corner matching Hình 1 */}
                    <path
                      d="M 366 420 C 370 368, 412 344, 456 322 C 478 310, 492 286, 498 256"
                      stroke="#7ce8ff"
                      strokeOpacity="0.22"
                      strokeWidth="2.2"
                      strokeDasharray="3 6"
                      fill="none"
                    />
                    <path
                      d="M 412 420 C 424 382, 448 352, 474 316 C 488 296, 494 274, 498 242"
                      stroke="#7ce8ff"
                      strokeOpacity="0.18"
                      strokeWidth="2"
                      strokeDasharray="2.5 5.5"
                      fill="none"
                    />

                    {/* Outer Thin Cyan Border + Top-Center Trapezoid Notch */}
                    <path
                      d="M 14 10 H 204 L 210 18 H 304 L 310 10 H 500 V 422 H 14 Z"
                      stroke="#7ce8ff"
                      strokeOpacity="0.58"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    <line
                      x1="204"
                      y1="10"
                      x2="310"
                      y2="10"
                      stroke="#7ce8ff"
                      strokeOpacity="0.35"
                      strokeWidth="1"
                    />

                    {/* 4 Glowing Cyan L-Shaped Corner Brackets */}
                    <path
                      d="M 12 32 V 9 H 36"
                      stroke="#9cf8ff"
                      strokeWidth="3.8"
                      strokeLinecap="square"
                    />
                    <path
                      d="M 478 9 H 502 V 32"
                      stroke="#9cf8ff"
                      strokeWidth="3.8"
                      strokeLinecap="square"
                    />
                    <path
                      d="M 12 400 V 423 H 36"
                      stroke="#9cf8ff"
                      strokeWidth="3.8"
                      strokeLinecap="square"
                    />
                    <path
                      d="M 478 423 H 502 V 400"
                      stroke="#9cf8ff"
                      strokeWidth="3.8"
                      strokeLinecap="square"
                    />

                    {/* Top-Right & Bottom-Left Cyber Pixel Clusters (::::) */}
                    {[422, 430, 438, 446].map((cx) => (
                      <g key={`tr-${cx}`} fill="#b8f6ff" fillOpacity="0.85">
                        <rect x={cx} y="20" width="3" height="3" />
                        <rect x={cx - 6} y="27" width="3" height="3" />
                      </g>
                    ))}
                    {[30, 38, 46, 54].map((cx) => (
                      <g key={`bl-${cx}`} fill="#b8f6ff" fillOpacity="0.85">
                        <rect x={cx} y="410" width="3" height="3" />
                        <rect x={cx + 4} y="417" width="3" height="3" />
                      </g>
                    ))}

                    {/* Header: + Diagnostic Checklist + */}
                    {/* Left Plus (+) Icon */}
                    <g fill="#73cde8" fillOpacity="0.92">
                      <rect x="92" y="54" width="18" height="6" rx="1" />
                      <rect x="98" y="48" width="6" height="18" rx="1" />
                    </g>
                    {/* Right Plus (+) Icon */}
                    <g fill="#73cde8" fillOpacity="0.92">
                      <rect x="404" y="54" width="18" height="6" rx="1" />
                      <rect x="410" y="48" width="6" height="18" rx="1" />
                    </g>
                    {/* Main Title */}
                    <text
                      x="257"
                      y="66"
                      textAnchor="middle"
                      fill="#f8fdff"
                      fontFamily="'Be Vietnam Pro', 'Segoe UI', sans-serif"
                      fontWeight="700"
                      fontSize="27.5"
                      letterSpacing="0.2"
                      filter="url(#diagTextGlow)"
                    >
                      {DIAGNOSTIC_CHECKLIST_TEXT.title}
                    </text>
                    {/* Subtitle: DIAGNOSIS REPORT */}
                    <text
                      x="257"
                      y="91"
                      textAnchor="middle"
                      fill="#a2c9ec"
                      fontFamily="'Chakra Petch', 'Segoe UI', sans-serif"
                      fontWeight="600"
                      fontSize="12.5"
                      letterSpacing="2.2"
                    >
                      {DIAGNOSTIC_CHECKLIST_TEXT.subtitle}
                    </text>

                    {/* 3 Horizontal Divider Lines with Left Accent Bar + Node Dot (•) */}
                    {[118, 250, 382].map((yPos) => (
                      <g key={`div-${yPos}`}>
                        <line
                          x1="56"
                          y1={yPos}
                          x2="442"
                          y2={yPos}
                          stroke="#9ed8ff"
                          strokeOpacity="0.52"
                          strokeWidth="1.3"
                        />
                        <line
                          x1="56"
                          y1={yPos}
                          x2="82"
                          y2={yPos}
                          stroke="#bae6ff"
                          strokeOpacity="0.82"
                          strokeWidth="2.8"
                        />
                        <circle
                          cx="82"
                          cy={yPos}
                          r="2.8"
                          fill="#d6f2ff"
                          fillOpacity="0.92"
                        />
                      </g>
                    ))}

                    {/* Checklist Items (Row 1 & Row 2) */}
                    {(selectedCareLog === 5
                      ? DIAGNOSTIC_CHECKLIST_LOG5_TEXT.items
                      : selectedCareLog === 4
                        ? DIAGNOSTIC_CHECKLIST_LOG4_TEXT.items
                        : selectedCareLog === 3
                          ? DIAGNOSTIC_CHECKLIST_LOG3_TEXT.items
                          : selectedCareLog === 2
                            ? DIAGNOSTIC_CHECKLIST_LOG2_TEXT.items
                            : DIAGNOSTIC_CHECKLIST_TEXT.items
                    ).map((item, rowIdx) => {
                      const rowTop = rowIdx === 0 ? 118 : 250;
                      const iconX = 56;
                      const iconY = rowTop + 28;
                      const textX = 148;
                      const firstLineY =
                        item.lines.length > 1 ? rowTop + 60 : rowTop + 75;
                      const lineGap = 31;
                      const isCompleted = clinicDialogueStep === 7 && rowIdx === 0;

                      return (
                        <g key={item.id} opacity={isCompleted ? 0.38 : 1}>
                          {/* Left Target Bracket Icon (74x74) */}
                          <g transform={`translate(${iconX}, ${iconY})`}>
                            <path
                              d="M 4 24 V 4 H 24 M 50 4 H 70 V 24 M 70 50 V 70 H 50 M 24 70 H 4 V 50"
                              stroke="#7ae8ff"
                              strokeWidth="3.2"
                              strokeLinecap="square"
                            />
                            {item.iconType === 'face' ? (
                              <g>
                                <circle cx="37" cy="34.5" r="19" fill="#ffffff" />
                                <path
                                  d="M 18.5 61 C 22 53.5, 52 53.5, 55.5 61 Z"
                                  fill="#ffffff"
                                />
                                <ellipse cx="30.2" cy="37.5" rx="2.2" ry="3.1" fill="#183f96" />
                                <ellipse cx="43.8" cy="37.5" rx="2.2" ry="3.1" fill="#183f96" />
                                <path
                                  d="M 34.4 43.2 Q 37 45.4 39.6 43.2"
                                  stroke="#183f96"
                                  strokeWidth="2.1"
                                  strokeLinecap="round"
                                  fill="none"
                                />
                              </g>
                            ) : item.iconType === 'brain' ? (
                              <g>
                                {/* White Side-Profile Head Silhouette (facing left) matching image_ee4ddd52.png */}
                                <path
                                  d="M 38 14 C 50.5 14, 57.5 22.5, 57.5 33.5 C 57.5 41.5, 53 48.2, 46.8 51.5 L 46.8 55.2 L 50.8 59.5 H 25.5 L 30.2 55.2 V 51.2 L 22.5 51.2 C 20 51.2, 19.2 49.4, 19.8 47.4 L 20.5 45.2 L 19.2 44.2 C 18.5 43.6, 18.9 42.4, 20.2 42 L 20.5 40.4 L 17.2 38.6 C 16.0 37.9, 16.2 36.4, 17.5 35.4 L 20.5 32.8 C 20.2 22.0, 27.5 14, 38 14 Z"
                                  fill="#ffffff"
                                />
                                {/* Cyan-Blue Brain Contour & Cerebral Folds inside the Head */}
                                <path
                                  d="M 30.5 23.2 C 30.5 20.4, 34 18.8, 37.2 19.5 C 39.8 18.2, 43.8 18.6, 45.8 20.8 C 49.2 21.2, 51.6 24.0, 51.4 27.4 C 52.8 29.8, 51.8 33.4, 49.2 34.8 C 48.2 37.4, 44.8 38.4, 42.0 37.5 L 40.5 40.5 H 37.2 L 38.0 36.8 C 34.2 36.8, 30.4 35.2, 28.8 32.5 C 26.2 30.8, 26.5 26.2, 29.5 24.6 C 29.6 23.9, 30.0 23.4, 30.5 23.2 Z"
                                  fill="#256ec2"
                                  stroke="#174996"
                                  strokeWidth="1.2"
                                  strokeLinejoin="round"
                                />
                                {/* Inner Bright Cyan Brain Gyri / Sulci Lines */}
                                <path
                                  d="M 30.5 27.8 C 33.2 26.2, 36.5 27.2, 38.2 29.2 M 36.2 22.8 C 39.2 22.2, 42.2 23.8, 42.8 26.8 M 43.2 22.5 C 46.2 23.2, 48.4 25.6, 47.6 28.6 M 29.8 31.4 C 33.5 32.2, 37.4 31.8, 41.2 29.6 C 44.2 27.8, 47.5 29.4, 49.2 31.8 M 34.8 34.6 C 38.4 34.8, 42.6 33.8, 45.8 35.2"
                                  stroke="#9bf4ff"
                                  strokeWidth="1.55"
                                  strokeLinecap="round"
                                  fill="none"
                                />
                              </g>
                            ) : (
                              <g>
                                <path
                                  d="M 31.8 16.5 C 31.8 14.8, 42.2 14.8, 42.2 16.5 L 43.4 22.5 L 54.4 27.6 C 57.2 29, 58.4 31.6, 58.4 35.2 V 57.2 C 58.4 59, 56.9 60, 55 60 H 50 V 38.6 H 47 V 60 H 27 V 38.6 H 24 V 60 H 19 C 17.1 60, 15.6 59, 15.6 57.2 V 35.2 C 15.6 31.6, 16.8 29, 19.6 27.6 L 30.6 22.5 Z"
                                  fill="#ffffff"
                                />
                              </g>
                            )}
                          </g>

                          {/* Editable Multi-Line Text */}
                          {item.lines.map((line, lineIdx) => (
                            <text
                              key={lineIdx}
                              x={textX}
                              y={firstLineY + lineIdx * lineGap}
                              fill={isCompleted ? '#b8d4f2' : '#f4f9ff'}
                              fontFamily="'Be Vietnam Pro', 'Segoe UI', sans-serif"
                              fontWeight="500"
                              fontSize="23.5"
                              letterSpacing="0.15"
                              filter="url(#diagTextGlow)"
                            >
                              {line}
                            </text>
                          ))}
                        </g>
                      );
                    })}
                  </svg>
                </div>
              )}
            </div>

            {/* Interactive HUD Layer with Top-Left Back Button, Bottom Shroud & Scan Button */}
            <div className="glitchtopia-hud-layer">
              {/* Bottom Dark-Blue & Cyan Sci-Fi Shroud Overlay (appears as soon as scanning starts) */}
              {clinicScanPhase !== 'idle' && (
                <div className="restore-clinic-bottom-shroud" aria-hidden="true">
                  <svg
                    className="restore-clinic-bottom-shroud-svg"
                    viewBox="0 0 1000 320"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="shroudSideLineGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#9ce6ff" stopOpacity="0.18" />
                        <stop offset="28%" stopColor="#b8f0ff" stopOpacity="0.62" />
                        <stop offset="85%" stopColor="#72d8ff" stopOpacity="0.48" />
                        <stop offset="100%" stopColor="#58d0ff" stopOpacity="0.2" />
                      </linearGradient>
                      <pattern
                        id="shroudEdgeScanlines"
                        width="8"
                        height="5"
                        patternUnits="userSpaceOnUse"
                      >
                        <line
                          x1="0"
                          y1="0"
                          x2="8"
                          y2="0"
                          stroke="#86dcff"
                          strokeOpacity="0.2"
                          strokeWidth="1.2"
                        />
                      </pattern>
                    </defs>

                    {/* Left & Right Outer Margin Scanline Strips */}
                    <rect
                      x="0"
                      y="108"
                      width="34"
                      height="212"
                      fill="url(#shroudEdgeScanlines)"
                    />
                    <rect
                      x="966"
                      y="108"
                      width="34"
                      height="212"
                      fill="url(#shroudEdgeScanlines)"
                    />

                    {/* Left & Right Vertical HUD Guide Lines */}
                    <line
                      x1="34"
                      y1="18"
                      x2="34"
                      y2="320"
                      stroke="url(#shroudSideLineGrad)"
                      strokeWidth="1.6"
                    />
                    <line
                      x1="966"
                      y1="18"
                      x2="966"
                      y2="320"
                      stroke="url(#shroudSideLineGrad)"
                      strokeWidth="1.6"
                    />

                    {/* Small Square Nodes along Left & Right Vertical Guide Lines */}
                    {[20, 114, 198, 266].map((ny) => (
                      <g key={`node-${ny}`} fill="#dcf8ff" fillOpacity="0.88">
                        <rect x="31.5" y={ny} width="5" height="5" />
                        <rect x="963.5" y={ny} width="5" height="5" />
                      </g>
                    ))}

                    {/* Glowing Cyan-Teal Tick Marks (Upper 3 ticks ''' and Lower 2 ticks '') */}
                    {/* Upper-Left 3 ticks */}
                    <g fill="#5bf2ff" fillOpacity="0.92">
                      <rect x="76" y="34" width="3" height="10" rx="1" />
                      <rect x="84" y="34" width="3" height="10" rx="1" />
                      <rect x="92" y="34" width="3" height="10" rx="1" />
                    </g>
                    {/* Lower-Left 2 ticks */}
                    <g fill="#5bf2ff" fillOpacity="0.88">
                      <rect x="76" y="110" width="3" height="9" rx="1" />
                      <rect x="84" y="110" width="3" height="9" rx="1" />
                    </g>

                    {/* Upper-Right 3 ticks */}
                    <g fill="#5bf2ff" fillOpacity="0.92">
                      <rect x="905" y="34" width="3" height="10" rx="1" />
                      <rect x="913" y="34" width="3" height="10" rx="1" />
                      <rect x="921" y="34" width="3" height="10" rx="1" />
                    </g>
                    {/* Lower-Right 2 ticks */}
                    <g fill="#5bf2ff" fillOpacity="0.88">
                      <rect x="913" y="110" width="3" height="9" rx="1" />
                      <rect x="921" y="110" width="3" height="9" rx="1" />
                    </g>
                  </svg>
                </div>
              )}

              {/* Bottom-Right Interactive Scan Button (disappears once clicked) */}
              {clinicScanPhase === 'idle' && (
                <button
                  type="button"
                  aria-label="Scan"
                  onMouseEnter={() => sound.playHover()}
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.playSelect();
                    setClinicScanPhase('scanning');
                  }}
                  className="restore-clinic-scan-btn"
                >
                  <AssetImg
                    remoteSrc={ASSETS.scanButton.remote}
                    rawRemoteSrc={ASSETS.scanButton.rawRemote}
                    localSrc={ASSETS.scanButton.local}
                    alt="Scan"
                    className="restore-clinic-scan-img"
                  />
                </button>
              )}

              {/* Bottom-Center Holographic "Start" (step 3) / "Continue" (step 7) Button on the Square Grid */}
              {(clinicDialogueStep === 3 || clinicDialogueStep === 7) && (
                <button
                  type="button"
                  aria-label={clinicDialogueStep === 7 ? 'Continue' : 'Start'}
                  onMouseEnter={() => sound.playHover()}
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.playSuccess();
                    if (clinicDialogueStep === 3) {
                      setClinicDialogueStep(4);
                    } else if (clinicDialogueStep === 7) {
                      setClinicDialogueStep(8);
                    }
                  }}
                  className="restore-clinic-start-btn"
                >
                  <svg
                    className="restore-clinic-choice-svg"
                    viewBox="0 0 356 118"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="clinicStartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#123258" stopOpacity="0.86" />
                        <stop offset="52%" stopColor="#1c6196" stopOpacity="0.90" />
                        <stop offset="86%" stopColor="#2ca6d4" stopOpacity="0.94" />
                        <stop offset="100%" stopColor="#58def8" stopOpacity="0.97" />
                      </linearGradient>
                      <radialGradient id="clinicStartBotGlow" cx="0.5" cy="1" r="0.65">
                        <stop offset="0%" stopColor="#affbff" stopOpacity="0.55" />
                        <stop offset="60%" stopColor="#48d8f8" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#123258" stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    {/* Main Rectangular Holographic Fill */}
                    <rect
                      x="10"
                      y="10"
                      width="336"
                      height="98"
                      rx="2"
                      fill="url(#clinicStartGrad)"
                    />
                    <rect
                      x="10"
                      y="10"
                      width="336"
                      height="98"
                      rx="2"
                      fill="url(#clinicStartBotGlow)"
                    />

                    {/* Thin Cyan Inner Border */}
                    <rect
                      x="10"
                      y="10"
                      width="336"
                      height="98"
                      rx="2"
                      stroke="#68e4fc"
                      strokeOpacity="0.5"
                      strokeWidth="1.4"
                    />

                    {/* Bright Cyan Bottom Rim Highlight */}
                    <line
                      x1="14"
                      y1="107.5"
                      x2="342"
                      y2="107.5"
                      stroke="#a8fbff"
                      strokeWidth="2.6"
                    />

                    {/* 4 Outer Cyan Corner Brackets */}
                    <path
                      d="M 4 23 V 4 H 23 M 333 4 H 352 V 23 M 352 95 V 114 H 333 M 23 114 H 4 V 95"
                      stroke="#7ceeff"
                      strokeWidth="2.8"
                      strokeLinecap="square"
                    />

                    {/* Top-Left & Top-Right Micro Horizontal Tech Ticks */}
                    <line
                      x1="34"
                      y1="4"
                      x2="46"
                      y2="4"
                      stroke="#7ceeff"
                      strokeOpacity="0.75"
                      strokeWidth="2"
                    />
                    <line
                      x1="310"
                      y1="4"
                      x2="322"
                      y2="4"
                      stroke="#7ceeff"
                      strokeOpacity="0.75"
                      strokeWidth="2"
                    />
                  </svg>

                  <span className="restore-clinic-start-label">
                    {clinicDialogueStep === 7 ? 'Continue' : 'Start'}
                  </span>
                </button>
              )}

              {/* Step 4 & Step 8: Bottom Grid Narrative Prompt & Two Holographic Choice Buttons */}
              {(clinicDialogueStep === 4 || clinicDialogueStep === 8) && (
                <div className="restore-clinic-choice-panel">
                  <p className="restore-clinic-choice-prompt">
                    {clinicDialogueStep === 8
                      ? activeStep2Config.prompt
                      : activeStep1Config.prompt}
                  </p>

                  <div className="restore-clinic-choice-row">
                    {(clinicDialogueStep === 8
                      ? activeStep2Config.choices
                      : activeStep1Config.choices
                    ).map((choiceLabel, idx) => (
                      <button
                        key={choiceLabel}
                        type="button"
                        onMouseEnter={() => sound.playHover()}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (clinicDialogueStep === 4) {
                            triggerChibiScanStep(idx === 1 ? 1 : 0);
                          } else if (clinicDialogueStep === 8) {
                            triggerChibiScan2Step(idx === 1 ? 1 : 0);
                          }
                        }}
                        className="restore-clinic-choice-btn"
                      >
                        <svg
                          className="restore-clinic-choice-svg"
                          viewBox="0 0 356 118"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          preserveAspectRatio="none"
                          aria-hidden="true"
                        >
                          <defs>
                            <linearGradient
                              id={`clinicChoiceGrad-${idx}`}
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop offset="0%" stopColor="#123258" stopOpacity="0.86" />
                              <stop offset="52%" stopColor="#1c6196" stopOpacity="0.90" />
                              <stop offset="86%" stopColor="#2ca6d4" stopOpacity="0.94" />
                              <stop offset="100%" stopColor="#58def8" stopOpacity="0.97" />
                            </linearGradient>
                            <radialGradient
                              id={`clinicChoiceBotGlow-${idx}`}
                              cx="0.5"
                              cy="1"
                              r="0.65"
                            >
                              <stop offset="0%" stopColor="#affbff" stopOpacity="0.55" />
                              <stop offset="60%" stopColor="#48d8f8" stopOpacity="0.2" />
                              <stop offset="100%" stopColor="#123258" stopOpacity="0" />
                            </radialGradient>
                          </defs>

                          {/* Main Rectangular Holographic Fill */}
                          <rect
                            x="10"
                            y="10"
                            width="336"
                            height="98"
                            rx="2"
                            fill={`url(#clinicChoiceGrad-${idx})`}
                          />
                          <rect
                            x="10"
                            y="10"
                            width="336"
                            height="98"
                            rx="2"
                            fill={`url(#clinicChoiceBotGlow-${idx})`}
                          />

                          {/* Thin Cyan Inner Border */}
                          <rect
                            x="10"
                            y="10"
                            width="336"
                            height="98"
                            rx="2"
                            stroke="#68e4fc"
                            strokeOpacity="0.5"
                            strokeWidth="1.4"
                          />

                          {/* Bright Cyan Bottom Rim Highlight */}
                          <line
                            x1="14"
                            y1="107.5"
                            x2="342"
                            y2="107.5"
                            stroke="#a8fbff"
                            strokeWidth="2.6"
                          />

                          {/* 4 Outer Cyan Corner Brackets matching reference screenshot */}
                          <path
                            d="M 4 23 V 4 H 23 M 333 4 H 352 V 23 M 352 95 V 114 H 333 M 23 114 H 4 V 95"
                            stroke="#7ceeff"
                            strokeWidth="2.8"
                            strokeLinecap="square"
                          />

                          {/* Top-Left & Top-Right Micro Horizontal Tech Ticks */}
                          <line
                            x1="34"
                            y1="4"
                            x2="46"
                            y2="4"
                            stroke="#7ceeff"
                            strokeOpacity="0.75"
                            strokeWidth="2"
                          />
                          <line
                            x1="310"
                            y1="4"
                            x2="322"
                            y2="4"
                            stroke="#7ceeff"
                            strokeOpacity="0.75"
                            strokeWidth="2"
                          />
                        </svg>

                        <span className="restore-clinic-choice-label">{choiceLabel}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Maintenance Progress Status while scanning is in progress */}
              {isMaintenanceScanning && (
                <div
                  className="restore-clinic-maintenance-status"
                  role="status"
                  aria-live="polite"
                >
                  <span ref={maintenanceTextRef}>Maintenance in progress 0%</span>
                </div>
              )}

              {/* Step 11: Bottom "Tap to continue" Label matching image_67df016a.png */}
              {clinicDialogueStep === 11 && (
                <div className="restore-clinic-tap-continue" aria-hidden="true">
                  {FIXED_CLINIC_DIALOGUE.tapToContinueText}
                </div>
              )}
            </div>

            {/* Interactive HUD Layer with Top-Left Back Button (anchored to visible stage) */}
            <div className="glitchtopia-hud-layer">
              <button
                type="button"
                aria-label={lang === 'VI' ? 'Quay lại' : 'Back'}
                title={lang === 'VI' ? 'Quay lại' : 'Back'}
                onMouseEnter={() => sound.playHover()}
                onClick={(e) => {
                  e.stopPropagation();
                  backToHub();
                }}
                className="memory-terminal-back-btn"
              >
                <svg
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                >
                  <path
                    d="M18.5 5L14.2 9.3M11.6 11.9L9.5 14L18.5 23"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {canShowClinicSkip && (
                <button
                  type="button"
                  aria-label="Skip"
                  title="Skip"
                  onMouseEnter={() => sound.playHover()}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClinicSkip();
                  }}
                  className="restore-clinic-skip-btn"
                >
                  <span>Skip</span>
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="restore-clinic-skip-icon"
                    aria-hidden="true"
                  >
                    <path
                      d="M4.5 5L9.5 10L4.5 15M10.5 5L15.5 10L10.5 15"
                      stroke="currentColor"
                      strokeWidth="2.1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}

        {currentPage === 'memory-terminal' && (
          <div
            className="glitchtopia-stage is-ready"
            onClick={() => {
              // Clicking empty background resets tapped/chosen chapter state
              if (tappedChapter !== null || chosenChapter !== null) {
                setTappedChapter(null);
                setChosenChapter(null);
              }
            }}
          >
            {/* Memory Terminal Background Image */}
            <AssetImg
              remoteSrc={ASSETS.memoryWall.remote}
              rawRemoteSrc={ASSETS.memoryWall.rawRemote}
              localSrc={ASSETS.memoryWall.local}
              alt="Memory Terminal Background"
              className="glitchtopia-wall-img"
            />

            {/* Interactive Chapter Cards Layer */}
            <div className="glitchtopia-hud-layer" data-chosen-chapter={chosenChapter ?? ''}>
              {/* Back Button to return to Glitchtopia main hub (frameless) */}
              <button
                type="button"
                aria-label={lang === 'VI' ? 'Quay lại Glitchtopia' : 'Back to Glitchtopia'}
                title={lang === 'VI' ? 'Quay lại Glitchtopia' : 'Back to Glitchtopia'}
                onMouseEnter={() => sound.playHover()}
                onClick={(e) => {
                  e.stopPropagation();
                  backToHub();
                }}
                className="memory-terminal-back-btn"
              >
                <svg
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                >
                  <path
                    d="M18.5 5L14.2 9.3M11.6 11.9L9.5 14L18.5 23"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* 6 Diagonal Chapter Cards (05 down to 00) */}
              {MEMORY_CHAPTERS.map((item) => {
                const isChosen = chosenChapter === item.chapter;
                const isShifted =
                  isChosen ||
                  hoveredChapter === item.chapter ||
                  tappedChapter === item.chapter;
                const activeRemote = isShifted ? item.selectRemote : item.normalRemote;
                const activeRawRemote = isShifted ? item.selectRawRemote : item.normalRawRemote;
                const activeLocal = isShifted ? item.selectLocal : item.normalLocal;

                return (
                  <button
                    key={item.chapter}
                    type="button"
                    data-chapter={item.chapter}
                    aria-label={item.label}
                    onMouseEnter={() => {
                      if (
                        typeof window !== 'undefined' &&
                        window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)').matches
                      ) {
                        sound.playHover();
                        setHoveredChapter(item.chapter);
                      }
                    }}
                    onMouseLeave={() => {
                      if (hoveredChapter === item.chapter) {
                        setHoveredChapter(null);
                      }
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChapterClick(item.chapter);
                    }}
                    className={`memory-chapter-card ${isShifted ? 'is-shifted' : ''} ${
                      isChosen ? 'is-chosen' : ''
                    }`}
                  >
                    <AssetImg
                      remoteSrc={activeRemote}
                      rawRemoteSrc={activeRawRemote}
                      localSrc={activeLocal}
                      alt={item.label}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {currentPage === 'defense-intercept' && (
          <Suspense fallback={null}>
            <RobotTouchSection
              lang={lang}
              isBootReady={isWallReady}
              onNavigateGlitchtopiaHub={backToHub}
            />
          </Suspense>
        )}
      </main>
    </div>
  );
}
