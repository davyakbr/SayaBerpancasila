'use client';

import React from 'react';
import { ActivityData } from '@/types';
import SilaBadge from './SilaBadge';
import { SILA_LIST } from '@/lib/constants';
import { useAdmin } from '@/context/AdminContext';
import { Calendar, Edit, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';

interface ActivityCardProps {
  activity: ActivityData;
  onDelete?: (id: string) => void;
  onSelectDetail?: (activity: ActivityData) => void;
}

export default function ActivityCard({ activity, onDelete, onSelectDetail }: ActivityCardProps) {
  const { isAdmin } = useAdmin();
  const silaInfo = SILA_LIST[activity.sila] || SILA_LIST[1];

  const formatDate = (dateStr: string | Date) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-rose-100/80 shadow-soft hover:shadow-maroon/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between group">
      <div>
        {/* Card Header Section */}
        {activity.imageUrl ? (
          <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
            <img
              src={activity.imageUrl}
              alt={activity.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3">
              <SilaBadge sila={activity.sila} showText={false} size="sm" />
            </div>
          </div>
        ) : (
          /* Official Sila emblem card header for activities without photo */
          <div className="relative h-48 w-full bg-gradient-to-br from-rose-950 via-maroon-900 to-rose-900 p-4 flex items-center justify-center overflow-hidden border-b border-rose-800/40">
            <div className="absolute top-3 left-3">
              <SilaBadge sila={activity.sila} showText={false} size="sm" />
            </div>

            {/* Official Sila Emblem Display */}
            <div className="w-24 h-24 bg-white/95 rounded-2xl p-2 shadow-lg border border-amber-300 flex flex-col items-center justify-center space-y-1 group-hover:scale-105 transition-transform duration-300">
              <img
                src={silaInfo.iconPath}
                alt={silaInfo.title}
                className="w-16 h-16 object-contain"
              />
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="p-5 space-y-2">
          {/* Date */}
          <div className="flex items-center gap-1.5 text-xs font-medium text-rose-800">
            <Calendar className="w-3.5 h-3.5 text-amber-600" />
            <span>{formatDate(activity.date)}</span>
          </div>

          {/* Penerapan / Title */}
          <h3 className="font-bold text-gray-900 text-base leading-snug line-clamp-3 group-hover:text-rose-900 transition-colors">
            {activity.title}
          </h3>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="px-5 py-3.5 bg-gray-50/70 border-t border-rose-100/60 flex items-center justify-between">
        <button
          onClick={() => onSelectDetail && onSelectDetail(activity)}
          className="text-xs font-semibold text-rose-900 hover:text-rose-950 flex items-center gap-1 bg-white px-3.5 py-1.5 rounded-lg border border-rose-200 shadow-xs hover:bg-rose-50 transition-colors"
        >
          <Eye className="w-3.5 h-3.5" /> Detail Kegiatan
        </button>

        {isAdmin && (
          <div className="flex items-center gap-1.5">
            <Link
              href={`/kegiatan/${activity.id}/edit`}
              className="p-1.5 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              title="Edit Kegiatan (Admin)"
            >
              <Edit className="w-4 h-4" />
            </Link>

            {onDelete && (
              <button
                onClick={() => onDelete(activity.id)}
                className="p-1.5 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                title="Hapus Kegiatan (Admin)"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
