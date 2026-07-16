import React, { useState } from 'react';
import { useDeliveryAgent } from "../../../hooks/useDeliveryAgent";
import { 
  FaMotorcycle, FaStar, FaPhoneAlt, FaEnvelope, FaBox, 
  FaIdCard, FaMapMarkerAlt, FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaImage
} from "react-icons/fa";
import { STORAGE_URL } from "../../../components/config/publicApi"
import { useNavigate } from 'react-router-dom';

const DeliveryAgent = () => {
  const { data: apiResponse, isLoading, isError } = useDeliveryAgent();
  
 
  const [selectedImage, setSelectedImage] = useState(null);

  const agents = apiResponse?.data || [];

  const navigate = useNavigate();

  
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[50vh] items-center justify-center p-4 text-center">
        <p className="text-lg font-semibold text-red-500 bg-red-50 px-6 py-3 rounded-xl border border-red-100">
          Failed to load delivery agents. Please try again.
        </p>
      </div>
    );
  }

  if (agents.length === 0) {
    return (
      <div className="flex h-[50vh] items-center justify-center flex-col gap-3">
        <FaMotorcycle className="text-gray-300 text-6xl" />
        <p className="text-lg font-medium text-gray-500">No delivery agents found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-2 sm:p-2 lg:p-2">
      
      
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Delivery Agents</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and view all details of your active delivery personnel.
          </p>
        </div>
        {/* <div className="inline-flex items-center rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 border border-blue-100 shadow-sm self-start sm:self-auto">
          Total Agents: {apiResponse?.meta?.total || 0}
        </div> */}
       <button
      onClick={() => navigate("/admin/register-delivery-agent")}
      className="inline-flex items-center rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 border border-blue-100 shadow-sm hover:bg-blue-100 transition"
    >
      Register Agents
    </button>
      </div>

      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => {
          const user = agent.user;
          const isAvailable = agent.is_available;

          return (
            <div 
              key={agent.id} 
              className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md hover:border-blue-200"
            >
              
              <div className="flex items-start justify-between border-b p-4 sm:p-5 bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg sm:text-xl font-bold text-blue-600 uppercase shadow-sm border border-blue-200">
                    {user?.name?.charAt(0) || "A"}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-900 capitalize truncate text-base sm:text-lg">
                      {/* {user?.name || "Unknown"} */}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className={`h-2.5 w-2.5 rounded-full ${isAvailable ? "bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]" : "bg-red-500"}`}></span>
                        <span className="text-xs font-medium text-gray-600">
                          {isAvailable ? "Available" : "Offline"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {user?.status === 'active' ? (
                           <FaCheckCircle className="text-green-500 text-xs" title="Account Active" />
                        ) : (
                           <FaTimesCircle className="text-red-500 text-xs" title="Account Inactive" />
                        )}
                        <span className="text-xs text-gray-500 capitalize">{user?.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <div className="flex items-center gap-1 rounded-md bg-yellow-100 px-2 py-1 text-sm font-bold text-yellow-700">
                    <FaStar size={14} className="text-yellow-500" />
                    {agent.rating}
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">ID: #{agent.id}</span>
                </div>
              </div>

              
              <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
                
               
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <div className="bg-gray-100 p-1.5 rounded-full text-gray-500"><FaPhoneAlt size={12} /></div>
                    <span>{user?.phone || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <div className="bg-gray-100 p-1.5 rounded-full text-gray-500"><FaEnvelope size={12} /></div>
                    <span className="truncate">{user?.email || "N/A"}</span>
                  </div>
                </div>

                <hr className="border-gray-100" />

                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Vehicle</p>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <FaMotorcycle className="text-blue-500 shrink-0" />
                      <div className="flex flex-col">
                        <span className="uppercase font-medium text-xs sm:text-sm">{agent.vehicle_number || "N/A"}</span>
                        <span className="text-[10px] text-gray-400 capitalize">{agent.vehicle_type || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">License</p>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <FaIdCard className="text-purple-500 shrink-0" />
                      <span className="uppercase font-medium text-xs sm:text-sm truncate" title={agent.license_number}>
                        {agent.license_number || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-100" />

                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Deliveries</p>
                    <div className="flex items-center gap-2 font-semibold text-gray-800 text-sm">
                      <div className="bg-orange-100 p-1.5 rounded text-orange-600"><FaBox size={12} /></div>
                      {agent.total_deliveries}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Location</p>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <FaMapMarkerAlt className="text-red-500 shrink-0" />
                      {agent.current_lat && agent.current_lng ? (
                        <span className="text-[11px] sm:text-xs truncate">{agent.current_lat.slice(0,6)}, {agent.current_lng.slice(0,6)}</span>
                      ) : (
                        <span className="text-xs text-gray-400">Unavailable</span>
                      )}
                    </div>
                  </div>
                </div>

                <hr className="border-gray-100" />

               
               
                <div className="grid grid-cols-2 gap-3 items-end">
                  
                  
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Documents</p>
                    <div className="flex gap-3">
                      
                      
                      <div className="flex flex-col items-center gap-1 group">
                        {agent.front_image ? (
                          <div 
                            onClick={() => setSelectedImage(agent.front_image)}
                            className="h-12 w-16 sm:h-14 sm:w-20 rounded-md overflow-hidden border border-gray-200 shadow-sm cursor-pointer"
                          >
                            <img 
                              src={`${STORAGE_URL}/${agent.front_image}`} 
                              alt="Front ID" 
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                              onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Error'; }} 
                            />
                          </div>
                        ) : (
                          <div className="h-12 w-16 sm:h-14 sm:w-20 rounded-md bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400">
                            <FaImage size={16} />
                          </div>
                        )}
                        <span className="text-[10px] text-gray-500 font-medium">Front</span>
                      </div>

                      
                      <div className="flex flex-col items-center gap-1 group">
                        {agent.back_image ? (
                          <div 
                            onClick={() => setSelectedImage(agent.back_image)}
                            className="h-12 w-16 sm:h-14 sm:w-20 rounded-md overflow-hidden border border-gray-200 shadow-sm cursor-pointer"
                          >
                            <img
                              src={`${STORAGE_URL}/${agent.back_image}`} 
                              alt="Back ID" 
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                              onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Error'; }} 
                            />
                          </div>
                        ) : (
                          <div className="h-12 w-16 sm:h-14 sm:w-20 rounded-md bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400">
                            <FaImage size={16} />
                          </div>
                        )}
                        <span className="text-[10px] text-gray-500 font-medium">Back</span>
                      </div>
                    </div>
                  </div>
                  
                 
                  <div className="pb-4">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Joined</p>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <FaCalendarAlt className="text-teal-500 shrink-0" />
                      <span className="text-xs font-medium">{formatDate(agent.created_at)}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
      
      
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm z-[9999]"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full flex justify-center animate-[fadeIn_.25s_ease]">
           
            <button 
              className="absolute -top-12 right-0 text-white hover:text-red-500 transition-colors text-4xl"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
           
            <img 
              src={selectedImage} 
              alt="Document Full View" 
              className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl bg-white/5"
              onClick={(e) => e.stopPropagation()} // Image pe click hone par band na ho
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default DeliveryAgent;