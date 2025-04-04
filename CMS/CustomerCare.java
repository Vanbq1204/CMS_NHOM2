package CMS;

/**
 * Generated from IDL struct "CustomerCare".
 *
 * @author JacORB IDL compiler V 3.9
 * @version generated at Apr 4, 2025, 3:18:30 AM
 */

public final class CustomerCare
	implements org.omg.CORBA.portable.IDLEntity
{
	/** Serial version UID. */
	private static final long serialVersionUID = 1L;
	public CustomerCare(){}
	public java.lang.String ticketId = "";
	public java.lang.String customerId = "";
	public java.lang.String issue = "";
	public java.lang.String status = "";
	public java.lang.String priority = "";
	public java.lang.String resolution = "";
	public CustomerCare(java.lang.String ticketId, java.lang.String customerId, java.lang.String issue, java.lang.String status, java.lang.String priority, java.lang.String resolution)
	{
		this.ticketId = ticketId;
		this.customerId = customerId;
		this.issue = issue;
		this.status = status;
		this.priority = priority;
		this.resolution = resolution;
	}
}
