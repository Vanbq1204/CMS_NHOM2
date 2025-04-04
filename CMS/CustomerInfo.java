package CMS;

/**
 * Generated from IDL struct "CustomerInfo".
 *
 * @author JacORB IDL compiler V 3.9
 * @version generated at Apr 4, 2025, 3:18:30 AM
 */

public final class CustomerInfo
	implements org.omg.CORBA.portable.IDLEntity
{
	/** Serial version UID. */
	private static final long serialVersionUID = 1L;
	public CustomerInfo(){}
	public java.lang.String customerId = "";
	public java.lang.String customerName = "";
	public java.lang.String customerEmail = "";
	public java.lang.String customerPhone = "";
	public java.lang.String customerAddress = "";
	public java.lang.String customerStatus = "";
	public CustomerInfo(java.lang.String customerId, java.lang.String customerName, java.lang.String customerEmail, java.lang.String customerPhone, java.lang.String customerAddress, java.lang.String customerStatus)
	{
		this.customerId = customerId;
		this.customerName = customerName;
		this.customerEmail = customerEmail;
		this.customerPhone = customerPhone;
		this.customerAddress = customerAddress;
		this.customerStatus = customerStatus;
	}
}
