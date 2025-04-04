package CMS;


/**
 * Generated from IDL interface "CustomerUpdateService".
 *
 * @author JacORB IDL compiler V 3.9
 * @version generated at Apr 4, 2025, 3:18:30 AM
 */

public interface CustomerUpdateServiceOperations
{
	/* constants */
	/* operations  */
	boolean updateCustomerInfo(java.lang.String customerId, CMS.CustomerInfo newInfo);
	boolean updateStatus(java.lang.String customerId, java.lang.String newStatus);
	void logCustomerChange(java.lang.String customerId, java.lang.String changeType);
}
