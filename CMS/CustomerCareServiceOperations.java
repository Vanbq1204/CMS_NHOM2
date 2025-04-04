package CMS;


/**
 * Generated from IDL interface "CustomerCareService".
 *
 * @author JacORB IDL compiler V 3.9
 * @version generated at Apr 4, 2025, 3:18:30 AM
 */

public interface CustomerCareServiceOperations
{
	/* constants */
	/* operations  */
	java.lang.String createTicket(CMS.CustomerCare ticket);
	boolean updateTicket(java.lang.String ticketId, CMS.CustomerCare updateTicket);
	CMS.CustomerCare getTicketInfo(java.lang.String ticketId);
	CMS.CustomerCare[] getCustomerTicket(java.lang.String customerId);
}
