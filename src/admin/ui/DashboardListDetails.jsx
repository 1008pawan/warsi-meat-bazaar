import React from "react";
import { X } from "lucide-react";

const DashboardListDetails = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-6xl max-h-[92vh] rounded-3xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-red-500 border-b border-zinc-300 px-8 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Order Details</h2>

            <p className="text-white mt-1">{order.order_number}</p>
          </div>

          <div className="flex items-center gap-4">
            <span
              className={`px-4 py-1 rounded-full text-sm font-semibold capitalize
              ${
                order.status === "delivered"
                 ? "bg-yellow-400 text-black-700"
                  : order.status === "pending"
                    ?"bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
              }`}
            >
              {order.status}
            </span>

            <button
              onClick={onClose}
              className="rounded-xl p-2 bg-white hover:bg-gray-300 cursor-pointer"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(92vh-90px)] p-8 bg-gray-50 space-y-8">
          {/* Summary */}

          <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-5">
            <SummaryCard
              title="Total Amount"
              value={`₹${order.total}`}
              color="text-green-600"
            />

            <SummaryCard
              title="Payment"
              value={order.payment_status}
              color={
                order.payment_status === "paid"
                  ? "text-green-600"
                  : "text-red-600"
              }
            />

            <SummaryCard
              title="Order Type"
              value={order.type}
              color="text-blue-600"
            />

            <SummaryCard
              title="Products"
              value={order.items?.length || 0}
              color="text-purple-600"
            />

            <SummaryCard
              title="Delivery OTP"
              value={order.delivered_otp || "-"}
              color="text-orange-600"
            />
          </div>

          {/* Order */}

          <section>
            <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-5">
              Order Information
            </h3>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5">
              <Info label="Order ID" value={order.id} />

              <Info label="Customer ID" value={order.customer_id} />

              <Info label="Store ID" value={order.store_id} />

              {/* <Info
                label="Delivery Agent ID"
                value={order.delivery_agent_id || "-"}
              /> */}

              {/* <Info label="Offer ID" value={order.offer_id || "-"} /> */}

              {/* <Info label="Referral ID" value={order.referral_id || "-"} /> */}

              {/* <Info label="Notes" value={order.notes || "-"} /> */}

              {/* <Info label="Delivered OTP" value={order.delivered_otp || "-"} /> */}

              <Info label="Delivered At" value={order.delivered_at || "-"} />

              <Info label="Cancelled At" value={order.cancelled_at || "-"} />

              <Info
                label="Cancellation Reason"
                value={order.cancellation_reason || "-"}
              />

              <Info
                label="Updated At"
                value={new Date(order.updated_at).toLocaleString()}
              />
            </div>
          </section>

          {/* Customer */}

          <section>
            <h3 className="text-xl font-bold border-l-4 border-green-600 pl-3 mb-5">
              Customer Details
            </h3>

            <div className="grid lg:grid-cols-3 gap-5">
              <Info label="Customer ID" value={order.customer?.id} />

              <Info label="Email" value={order.customer?.email || "-"} />

              <Info label="Status" value={order.customer?.status} />

              <Info
                label="Registered"
                value={new Date(order.customer?.created_at).toLocaleString()}
              />

              <Info
                label="Last Updated"
                value={new Date(order.customer?.updated_at).toLocaleString()}
              />
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold border-l-4 border-green-600 pl-3 mb-5">
              Shipping Address
            </h3>

            <div className="grid md:grid-cols-4 grid-cols-2 gap-5">
              <Info label="Label" value={order.shipping_address?.label} />

              <Info label="Receiver" value={order.shipping_address?.name} />

              <Info label="Phone" value={order.shipping_address?.phone} />

              <Info
                label="Address Line 1"
                value={order.shipping_address?.address_line1}
              />

              <Info
                label="Address Line 2"
                value={order.shipping_address?.address_line2}
              />

              <Info label="City" value={order.shipping_address?.city} />

              <Info label="State" value={order.shipping_address?.state} />

              <Info label="Country" value={order.shipping_address?.country} />

              <Info label="Pincode" value={order.shipping_address?.pincode} />

              <Info label="Latitude" value={order.shipping_address?.lat} />

              <Info label="Longitude" value={order.shipping_address?.lng} />

              <Info
                label="Default Address"
                value={order.shipping_address?.is_default ? "Yes" : "No"}
              />
            </div>
          </section>

          {/* Store */}
          <section>
            <h3 className="text-xl font-bold border-l-4 border-orange-500 pl-3 mb-5">
              Store Details
            </h3>

            <div className="grid md:grid-cols-3 gap-5">
              <Info label="Store ID" value={order.store?.id} />

              <Info label="Owner ID" value={order.store?.owner_id} />

              <Info label="Slug" value={order.store?.slug} />

              <Info label="Description" value={order.store?.description} />

              <Info
                label="Commission"
                value={`${order.store?.commission_rate}%`}
              />

              <Info label="Status" value={order.store?.status} />

              <Info label="Store Status" value={order.store?.store_status} />

              <Info
                label="Featured"
                value={order.store?.is_featured ? "Yes" : "No"}
              />

              <Info label="Rating" value={order.store?.rating} />

              <Info label="Reviews" value={order.store?.total_reviews} />

              <Info label="City" value={order.store?.city} />

              <Info label="State" value={order.store?.state} />

              <Info label="Country" value={order.store?.country} />

              <Info label="Latitude" value={order.store?.latitude} />

              <Info label="Longitude" value={order.store?.longitude} />
            </div>
          </section>

          {/* Amount */}

          <section>
            <h3 className="text-xl font-bold border-l-4 border-purple-600 pl-3 mb-5">
              Payment Summary
            </h3>

            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
              <AmountCard
                title="Subtotal"
                amount={order.subtotal}
                bg="bg-green-50"
                color="text-green-700"
              />

              <AmountCard
                title="Tax"
                amount={order.tax}
                bg="bg-blue-50"
                color="text-blue-700"
              />

              <AmountCard
                title="Delivery"
                amount={order.delivery_charge}
                bg="bg-yellow-50"
                color="text-yellow-700"
              />

              <AmountCard
                title="Discount"
                amount={order.discount}
                bg="bg-red-50"
                color="text-red-700"
              />

              <AmountCard
                title="Vendor"
                amount={order.vendor_earning}
                bg="bg-indigo-50"
                color="text-indigo-700"
              />

              <AmountCard
                title="Commission"
                amount={order.commission_amount}
                bg="bg-purple-50"
                color="text-purple-700"
              />

              <AmountCard
                title="Online"
                amount={order.payment_method === "online" ? order.total : 0}
              />

              <AmountCard
                title="Offline"
                amount={order.payment_method === "cash" ? order.total : 0}
              />

              <div className="bg-emerald-100 rounded-2xl p-5 lg:col-span-2 shadow-lg border border-zinc-200">
                <p className="text-gray-600 text-sm">Grand Total</p>

                <h2 className="text-4xl font-bold text-emerald-700 mt-2">
                  ₹{order.total}
                </h2>
              </div>
            </div>
          </section>

          {/* Products */}

          <section>
            <h3 className="text-xl font-bold border-l-4 border-red-500 pl-3 mb-5">
              Ordered Products
            </h3>

            <div className="overflow-x-auto rounded-2xl border border-zinc-300 bg-white shadow-md">
              <table className="min-w-full">
                <thead className="bg-red-500 text-white">
                  <tr>
                    <th className="px-5 py-4 text-left">Product</th>
                    <th className="px-5 py-4 text-left">Price</th>
                    <th className="px-5 py-4 text-left">Qty</th>
                    <th className="px-5 py-4 text-left">Total</th>
                    <th className="px-5 py-4 text-left">Weight</th>
                    <th className="px-5 py-4 text-left">Unit</th>
                  </tr>
                </thead>

                <tbody>
                  {(order.items ?? []).map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-zinc-300 hover:bg-blue-50"
                    >
                      <td className="px-5 py-4">{item.product_name ?? "-"}</td>

                      <td className="px-5 py-4">₹{item.price ?? 0}</td>

                      <td className="px-5 py-4">{item.quantity ?? "-"}</td>

                      <td className="px-5 py-4">₹{item.subtotal ?? 0}</td>

                      <td className="px-5 py-4">{item.weight ?? "-"}</td>

                      <td className="px-5 py-4">{item.unit ?? "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold border-l-4 border-green-600 pl-3 mb-5">
              Delivery Agent
            </h3>

            {order.delivery_agent ? (
              <div className="grid md:grid-cols-3 gap-31">
                <Info label="Name" value={order.delivery_agent.name} />

                <Info label="Phone" value={order.delivery_agent.phone} />

                <Info label="Status" value={order.delivery_agent.status} />
              </div>
            ) : (
              <div className="text-gray-500">Delivery Agent Not Assigned</div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-5">
    <p className="text-xs uppercase tracking-wide text-gray-400">{label}</p>

    <p className="mt-2 text-gray-800 font-semibold break-words">
      {value || "-"}
    </p>
  </div>
);

const SummaryCard = ({ title, value, color }) => (
  <div className="bg-white rounded-2xl shadow-lg border border-zinc-200 p-5">
    <p className="text-gray-500 text-sm">{title}</p>

    <h2 className={`text-3xl font-bold mt-2 capitalize ${color}`}>{value}</h2>
  </div>
);

const AmountCard = ({ title, amount, bg, color }) => (
  <div className={`${bg} rounded-2xl p-5 border border-zinc-200 shadow-lg`}>
    <p className="text-sm text-gray-500">{title}</p>

    <h2 className={`text-2xl font-bold mt-2 ${color}`}>₹{amount}</h2>
  </div>
);

export default DashboardListDetails;
