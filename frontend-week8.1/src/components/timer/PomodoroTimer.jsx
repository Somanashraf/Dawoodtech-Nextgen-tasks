import { useTimer } from '../../hooks/useTimer';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';

const PomodoroTimer = () => {
  const {
    minutes,
    seconds,
    isActive,
    isPaused,
    start,
    pause,
    resume,
    reset,
    setTime,
    progress,
  } = useTimer(25);

  const formatTime = (mins, secs) => {
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const presetTimes = [
    { label: 'Pomodoro', minutes: 25 },
    { label: 'Short Break', minutes: 5 },
    { label: 'Long Break', minutes: 15 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Pomodoro Timer</h1>
        <p className="text-gray-500 mt-1">
          Stay focused and productive with the Pomodoro Technique
        </p>
      </div>

      {/* Main Timer Card */}
      <div className="max-w-2xl mx-auto">
        <Card padding="large" className="text-center">
          {/* Timer Display */}
          <div className="mb-8">
            <div className="relative inline-block">
              {/* Circular Progress */}
              <svg className="transform -rotate-90" width="280" height="280">
                <circle
                  cx="140"
                  cy="140"
                  r="120"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="140"
                  cy="140"
                  r="120"
                  stroke="#0ea5e9"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={2 * Math.PI * 120}
                  strokeDashoffset={2 * Math.PI * 120 * (1 - progress / 100)}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>
              
              {/* Time Display */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div>
                  <div className="text-6xl font-bold text-gray-900 font-mono">
                    {formatTime(minutes, seconds)}
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    {isActive && !isPaused ? 'Focus Time' : isPaused ? 'Paused' : 'Ready to Start'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 mb-6">
            {!isActive || isPaused ? (
              <Button
                size="lg"
                onClick={isPaused ? resume : start}
                className="min-w-[140px]"
              >
                <Play size={20} />
                {isPaused ? 'Resume' : 'Start'}
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="lg"
                onClick={pause}
                className="min-w-[140px]"
              >
                <Pause size={20} />
                Pause
              </Button>
            )}
            
            <Button
              variant="secondary"
              size="lg"
              onClick={reset}
            >
              <RotateCcw size={20} />
              Reset
            </Button>
          </div>

          {/* Preset Times */}
          <div className="flex justify-center gap-3">
            {presetTimes.map((preset) => (
              <Button
                key={preset.label}
                variant="outline"
                size="sm"
                onClick={() => setTime(preset.minutes)}
                disabled={isActive}
              >
                {preset.label}
                <span className="text-xs ml-1">({preset.minutes}m)</span>
              </Button>
            ))}
          </div>
        </Card>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
        <Card padding="small" className="text-center">
          <Clock className="w-8 h-8 mx-auto mb-2 text-primary-600" />
          <h3 className="font-semibold text-gray-900 mb-1">25 Minutes</h3>
          <p className="text-xs text-gray-500">Focused work session</p>
        </Card>
        <Card padding="small" className="text-center">
          <Clock className="w-8 h-8 mx-auto mb-2 text-green-600" />
          <h3 className="font-semibold text-gray-900 mb-1">5 Minutes</h3>
          <p className="text-xs text-gray-500">Short break to recharge</p>
        </Card>
        <Card padding="small" className="text-center">
          <Clock className="w-8 h-8 mx-auto mb-2 text-purple-600" />
          <h3 className="font-semibold text-gray-900 mb-1">15 Minutes</h3>
          <p className="text-xs text-gray-500">Long break after 4 sessions</p>
        </Card>
      </div>

      {/* How it Works */}
      <Card className="max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          How the Pomodoro Technique Works
        </h2>
        <ol className="space-y-3 text-gray-600">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-semibold">
              1
            </span>
            <span>Choose a task you want to work on</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-semibold">
              2
            </span>
            <span>Set the timer for 25 minutes and focus on the task</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-semibold">
              3
            </span>
            <span>When the timer rings, take a 5-minute break</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-semibold">
              4
            </span>
            <span>After 4 pomodoros, take a longer 15-30 minute break</span>
          </li>
        </ol>
      </Card>
    </div>
  );
};

export default PomodoroTimer;
